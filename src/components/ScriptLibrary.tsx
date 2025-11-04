import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, Code2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Script {
  id: string;
  name: string;
  description: string;
  category: string;
  tier: string;
  chain: string | null;
  tags: string[] | null;
  curl_command: string;
}

export const ScriptLibrary = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchScripts();
  }, []);

  const fetchScripts = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('list-scripts');

      if (error) throw error;

      setScripts(data.scripts || []);
    } catch (error) {
      console.error('Error fetching scripts:', error);
      toast({
        title: "Error",
        description: "Failed to load script templates",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (command: string, scriptId: string) => {
    // Replace YOUR_TOKEN with actual token
    supabase.auth.getSession().then(({ data: { session } }) => {
      const token = session?.access_token || 'YOUR_TOKEN';
      const finalCommand = command.replace('YOUR_TOKEN', token);
      
      navigator.clipboard.writeText(finalCommand);
      setCopiedId(scriptId);
      toast({
        title: "Copied!",
        description: "Command copied to clipboard",
      });
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const categories = [
    { value: 'all', label: 'All Scripts' },
    { value: 'chain', label: 'Chains' },
    { value: 'bridge', label: 'Bridges' },
    { value: 'defi', label: 'DeFi' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const filterScripts = (category: string) => {
    if (category === 'all') return scripts;
    return scripts.filter(s => s.category === category);
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground mt-4">Loading templates...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Script Template Library</h2>
        <p className="text-muted-foreground">
          Choose from 18+ pre-built deployment scripts for various chains and protocols
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {categories.map(cat => (
            <TabsTrigger key={cat.value} value={cat.value}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(cat => (
          <TabsContent key={cat.value} value={cat.value} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {filterScripts(cat.value).map(script => (
                <Card key={script.id} className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-semibold">{script.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{script.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {script.chain && (
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {script.chain}
                        </span>
                      )}
                      {script.tags?.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs rounded-full bg-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted p-3 rounded-lg">
                    <code className="text-xs break-all">{script.curl_command}</code>
                  </div>

                  <Button
                    onClick={() => copyToClipboard(script.curl_command, script.id)}
                    className="w-full"
                    variant="outline"
                  >
                    {copiedId === script.id ? (
                      <>
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Command
                      </>
                    )}
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

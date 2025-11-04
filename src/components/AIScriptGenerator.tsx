import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Download, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIScriptGenerator = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-custom-script', {
        body: { messages: updatedMessages },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
      };
      setMessages([...updatedMessages, assistantMessage]);
    } catch (error: any) {
      console.error('Error generating script:', error);
      toast({
        title: "Generation Error",
        description: error.message || "Failed to generate script",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadScript = (script: string) => {
    const blob = new Blob([script], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom_dapp.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "Your custom script has been downloaded",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold">AI Script Generator</h2>
        </div>
        <p className="text-muted-foreground">
          Describe your dApp requirements and let AI create a custom deployment script
        </p>
      </div>

      <Card className="p-6 space-y-4">
        {/* Chat Messages */}
        {messages.length > 0 && (
          <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-primary/10 ml-8'
                    : 'bg-muted mr-8'
                }`}
              >
                <div className="font-semibold mb-2">
                  {msg.role === 'user' ? 'You' : 'AI Assistant'}
                </div>
                <pre className="whitespace-pre-wrap text-sm font-mono">
                  {msg.content}
                </pre>
                {msg.role === 'assistant' && msg.content.includes('import') && (
                  <Button
                    onClick={() => downloadScript(msg.content)}
                    className="mt-4"
                    variant="outline"
                    size="sm"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Script
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="space-y-4">
          <Textarea
            placeholder="Describe your dApp requirements... (e.g., 'I need an NFT marketplace on Polygon with bridge to Ethereum')"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            disabled={isGenerating}
          />
          
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !input.trim()}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Custom Script
              </>
            )}
          </Button>
        </div>

        {messages.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Start by describing your dApp requirements above</p>
            <p className="text-sm mt-2">
              The AI will ask clarifying questions and generate a complete deployment script
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: number;
  sender: "user" | "MediBot";
  content: string;
}

interface ChatBoxProps {
  initialMessage: string;
  suggestions: string[];
  onAIResponse: (tags: string[]) => void;
}

export function ChatBox({
  initialMessage,
  suggestions,
  onAIResponse,
}: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "MediBot", content: initialMessage },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typingContent, setTypingContent] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingContent]);

  const simulateTyping = async (content: string) => {
    for (let i = 0; i <= content.length; i++) {
      setTypingContent(content.slice(0, i));
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
    return content;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      content: newMessage.trim(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from MediBot");
      }

      const data = await response.json();
      const aiResponse = data.reply;
      console.log(aiResponse);
      const typedContent = await simulateTyping(aiResponse.message);

      const botMessage: Message = {
        id: messages.length + 2,
        sender: "MediBot",
        content: typedContent,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setTypingContent("");

      // Call the onAIResponse prop with the tags
      onAIResponse(aiResponse.tags);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[400px]">
      <ScrollArea className="flex-grow pr-4" ref={scrollAreaRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-2 mb-4 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "MediBot" && (
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="MediBot"
                />
                <AvatarFallback>MB</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-[#2f27ce] text-white"
                  : "bg-[#dedcff] text-black"
              }`}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
            {message.sender === "user" && (
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start space-x-2 mb-4">
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="MediBot"
              />
              <AvatarFallback>MB</AvatarFallback>
            </Avatar>
            <div className="p-3 rounded-lg bg-[#dedcff] text-black">
              <ReactMarkdown>
                {typingContent === "" ? "Thinking..." : typingContent}
              </ReactMarkdown>
            </div>
          </div>
        )}
        {error && (
          <div className="text-center p-2 mb-4">
            <span className="text-red-500 text-sm">{error}</span>
          </div>
        )}
      </ScrollArea>
      <div className="mt-2">
        <div className="flex space-x-2 mb-2">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setNewMessage(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

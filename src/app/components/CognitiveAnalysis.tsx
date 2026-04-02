import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Brain, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface AnalysisStep {
  id: number;
  title: string;
  content: string;
  type: "info" | "success" | "warning" | "error";
}

interface CognitiveAnalysisProps {
  steps: AnalysisStep[];
}

export function CognitiveAnalysis({ steps }: CognitiveAnalysisProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Brain className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "success":
        return "default";
      case "error":
        return "destructive";
      case "warning":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-6 h-6" />
          思维链分析过程
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {getIcon(step.type)}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-full bg-border mt-2" />
                )}
              </div>
              <div className="flex-1 pb-6">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium">步骤 {step.id}</h4>
                  <Badge variant={getBadgeVariant(step.type)}>
                    {step.title}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{step.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Upload, Sparkles } from "lucide-react";
import { Label } from "./ui/label";

interface StudentInputProps {
  onAnalyze: (data: string) => void;
  isAnalyzing: boolean;
}

const EXAMPLE_DATA = `{
  "studentId": "2024001",
  "studentName": "张三",
  "grade": "高一",
  "subject": "数学",
  "testDate": "2026-03-28",
  "answers": [
    {
      "questionId": 1,
      "knowledgePoints": ["函数基本概念", "定义域"],
      "difficulty": "简单",
      "studentAnswer": "A",
      "correctAnswer": "A",
      "isCorrect": true,
      "timeSpent": 45
    },
    {
      "questionId": 2,
      "knowledgePoints": ["函数单调性", "导数应用"],
      "difficulty": "中等",
      "studentAnswer": "C",
      "correctAnswer": "B",
      "isCorrect": false,
      "timeSpent": 120
    },
    {
      "questionId": 3,
      "knowledgePoints": ["三角函数", "诱导公式"],
      "difficulty": "中等",
      "studentAnswer": "B",
      "correctAnswer": "B",
      "isCorrect": true,
      "timeSpent": 90
    },
    {
      "questionId": 4,
      "knowledgePoints": ["数列", "等差数列"],
      "difficulty": "困难",
      "studentAnswer": "D",
      "correctAnswer": "A",
      "isCorrect": false,
      "timeSpent": 180
    },
    {
      "questionId": 5,
      "knowledgePoints": ["立体几何", "空间向量"],
      "difficulty": "困难",
      "studentAnswer": "C",
      "correctAnswer": "C",
      "isCorrect": true,
      "timeSpent": 150
    }
  ]
}`;

export function StudentInput({ onAnalyze, isAnalyzing }: StudentInputProps) {
  const [inputData, setInputData] = useState(EXAMPLE_DATA);

  const handleAnalyze = () => {
    onAnalyze(inputData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          学生答题记录输入
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="answer-data">答题数据（JSON格式）</Label>
          <Textarea
            id="answer-data"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="请输入学生答题记录JSON数据..."
            className="font-mono text-sm min-h-[400px]"
          />
        </div>
        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !inputData.trim()}
          className="w-full"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <Sparkles className="w-5 h-5 mr-2 animate-spin" />
              分析中...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              开始智能诊断
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  AlertTriangle,
  BookOpen,
} from "lucide-react";

interface DiagnosisData {
  studentName: string;
  grade: string;
  subject: string;
  testDate: string;
  totalQuestions: number;
  correctCount: number;
  accuracy: number;
  averageTime: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  rank: string;
}

interface DiagnosisReportProps {
  data: DiagnosisData;
}

export function DiagnosisReport({ data }: DiagnosisReportProps) {
  return (
    <div className="space-y-6">
      {/* 基本信息 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            学情诊断报告
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">学生姓名</p>
              <p className="font-medium">{data.studentName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">年级</p>
              <p className="font-medium">{data.grade}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">科目</p>
              <p className="font-medium">{data.subject}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">测试日期</p>
              <p className="font-medium">{data.testDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 答题统计 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            答题统计
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">正确率</span>
                <span className="text-2xl font-bold text-green-600">
                  {data.accuracy}%
                </span>
              </div>
              <Progress value={data.accuracy} className="h-2" />
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>
                  {data.correctCount} / {data.totalQuestions} 题
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">错误题数</span>
                <span className="text-2xl font-bold text-red-600">
                  {data.totalQuestions - data.correctCount}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <XCircle className="w-4 h-4 text-red-600" />
                <span>需要重点关注</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">平均用时</span>
                <span className="text-2xl font-bold text-blue-600">
                  {data.averageTime}s
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>答题速度 {data.rank}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 优势与不足 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="w-5 h-5" />
              知识优势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="w-5 h-5" />
              薄弱环节
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{weakness}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* 学习建议 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            个性化学习建议
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.suggestions.map((suggestion, index) => (
              <div key={index} className="flex gap-3">
                <Badge variant="outline" className="flex-shrink-0">
                  建议 {index + 1}
                </Badge>
                <p className="text-sm">{suggestion}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

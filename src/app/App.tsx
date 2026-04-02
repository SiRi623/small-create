import { useState } from "react";
import { StudentInput } from "./components/StudentInput";
import { CognitiveAnalysis } from "./components/CognitiveAnalysis";
import { DiagnosisReport } from "./components/DiagnosisReport";
import { KnowledgeChart } from "./components/KnowledgeChart";
import { AbilityAnalysis } from "./components/AbilityAnalysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Brain, BarChart3 } from "lucide-react";

interface AnalysisStep {
  id: number;
  title: string;
  content: string;
  type: "info" | "success" | "warning" | "error";
}

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

interface KnowledgePoint {
  subject: string;
  mastery: number;
  fullMark: number;
}

interface AbilityData {
  ability: string;
  score: number;
  average: number;
}

export default function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([]);
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisData | null>(
    null
  );
  const [knowledgeData, setKnowledgeData] = useState<KnowledgePoint[]>([]);
  const [abilityData, setAbilityData] = useState<AbilityData[]>([]);

  const simulateAnalysis = async (inputData: string) => {
    setIsAnalyzing(true);
    setAnalysisSteps([]);
    setDiagnosisData(null);

    try {
      const data = JSON.parse(inputData);

      // 模拟思维链分析过程
      const steps: AnalysisStep[] = [];

      // 步骤1: 数据接收与解析
      await delay(800);
      steps.push({
        id: 1,
        title: "数据接收",
        content: `成功接收学生 ${data.studentName}（${data.studentId}）的答题记录，共 ${data.answers.length} 道题目。开始进行认知诊断分析...`,
        type: "info",
      });
      setAnalysisSteps([...steps]);

      // 步骤2: 答题正确率分析
      await delay(1000);
      const correctCount = data.answers.filter(
        (a: any) => a.isCorrect
      ).length;
      const accuracy = Math.round((correctCount / data.answers.length) * 100);
      steps.push({
        id: 2,
        title: "正确率统计",
        content: `答对 ${correctCount} 题，答错 ${
          data.answers.length - correctCount
        } 题，正确率为 ${accuracy}%。${
          accuracy >= 80
            ? "整体表现优秀！"
            : accuracy >= 60
            ? "表现良好，仍有提升空间。"
            : "需要加强基础知识学习。"
        }`,
        type: accuracy >= 60 ? "success" : "warning",
      });
      setAnalysisSteps([...steps]);

      // 步骤3: 知识点分析
      await delay(1000);
      const knowledgeMap = new Map<string, { correct: number; total: number }>();
      data.answers.forEach((answer: any) => {
        answer.knowledgePoints.forEach((kp: string) => {
          if (!knowledgeMap.has(kp)) {
            knowledgeMap.set(kp, { correct: 0, total: 0 });
          }
          const current = knowledgeMap.get(kp)!;
          current.total++;
          if (answer.isCorrect) current.correct++;
        });
      });

      const knowledgeAnalysis = Array.from(knowledgeMap.entries())
        .map(([kp, stats]) => ({
          name: kp,
          mastery: Math.round((stats.correct / stats.total) * 100),
        }))
        .sort((a, b) => b.mastery - a.mastery);

      steps.push({
        id: 3,
        title: "知识点诊断",
        content: `分析了 ${knowledgeMap.size} 个知识点。掌握最好的是「${
          knowledgeAnalysis[0].name
        }」(${knowledgeAnalysis[0].mastery}%)，需要加强的是「${
          knowledgeAnalysis[knowledgeAnalysis.length - 1].name
        }」(${knowledgeAnalysis[knowledgeAnalysis.length - 1].mastery}%)。`,
        type: "info",
      });
      setAnalysisSteps([...steps]);

      // 步骤4: 答题时间分析
      await delay(1000);
      const avgTime = Math.round(
        data.answers.reduce((sum: number, a: any) => sum + a.timeSpent, 0) /
          data.answers.length
      );
      const timeRank =
        avgTime < 90 ? "较快" : avgTime < 120 ? "适中" : "偏慢";
      steps.push({
        id: 4,
        title: "时间效率分析",
        content: `平均每题用时 ${avgTime} 秒，答题速度${timeRank}。${
          avgTime > 120
            ? "建议提高答题速度，加强时间管理能力。"
            : "时间分配合理。"
        }`,
        type: avgTime > 120 ? "warning" : "success",
      });
      setAnalysisSteps([...steps]);

      // 步骤5: 难度适应性分析
      await delay(1000);
      const difficultyStats = {
        简单: { correct: 0, total: 0 },
        中等: { correct: 0, total: 0 },
        困难: { correct: 0, total: 0 },
      };
      data.answers.forEach((answer: any) => {
        const diff = answer.difficulty as keyof typeof difficultyStats;
        difficultyStats[diff].total++;
        if (answer.isCorrect) difficultyStats[diff].correct++;
      });

      const easyRate =
        difficultyStats["简单"].total > 0
          ? Math.round(
              (difficultyStats["简单"].correct /
                difficultyStats["简单"].total) *
                100
            )
          : 0;
      const hardRate =
        difficultyStats["困难"].total > 0
          ? Math.round(
              (difficultyStats["困难"].correct /
                difficultyStats["困难"].total) *
                100
            )
          : 0;

      steps.push({
        id: 5,
        title: "难度适应性",
        content: `简单题正确率 ${easyRate}%，困难题正确率 ${hardRate}%。${
          hardRate >= 50
            ? "能够应对高难度题目，思维能力较强。"
            : "需要加强复杂问题的解决能力。"
        }`,
        type: "info",
      });
      setAnalysisSteps([...steps]);

      // 步骤6: 生成诊断报告
      await delay(800);
      const strengths: string[] = [];
      const weaknesses: string[] = [];

      knowledgeAnalysis.forEach((kp) => {
        if (kp.mastery >= 80) {
          strengths.push(`${kp.name}掌握扎实，正确率达到 ${kp.mastery}%`);
        } else if (kp.mastery < 50) {
          weaknesses.push(
            `${kp.name}掌握不足，正确率仅 ${kp.mastery}%，需要重点复习`
          );
        }
      });

      if (avgTime < 90) {
        strengths.push("答题速度快，时间管理能力强");
      } else if (avgTime > 120) {
        weaknesses.push("答题速度偏慢，建议加强练习提高熟练度");
      }

      const suggestions = [
        `针对薄弱知识点「${
          knowledgeAnalysis[knowledgeAnalysis.length - 1].name
        }」，建议每天安排 30 分钟专项练习，可从基础概念开始巩固。`,
        `保持对「${knowledgeAnalysis[0].name}」的学习优势，可以尝试更高难度的拓展题目，培养创新思维。`,
        hardRate < 50
          ? "针对困难题目，建议采用小组讨论学习法，通过思维碰撞提升解题能力。"
          : "继续保持良好的解题思路，可以担任学习小组的辅导员帮助其他同学。",
        "建议制定个性化学习计划，每周进行一次阶段性测试，跟踪学习进度。",
      ];

      setDiagnosisData({
        studentName: data.studentName,
        grade: data.grade,
        subject: data.subject,
        testDate: data.testDate,
        totalQuestions: data.answers.length,
        correctCount,
        accuracy,
        averageTime: avgTime,
        strengths,
        weaknesses,
        suggestions,
        rank: timeRank,
      });

      // 设置知识图谱数据
      setKnowledgeData(
        knowledgeAnalysis.map((kp) => ({
          subject: kp.name,
          mastery: kp.mastery,
          fullMark: 100,
        }))
      );

      // 设置能力分析数据
      setAbilityData([
        { ability: "理解能力", score: 75 + Math.random() * 20, average: 75 },
        { ability: "运算能力", score: 70 + Math.random() * 20, average: 72 },
        { ability: "推理能力", score: 65 + Math.random() * 25, average: 70 },
        { ability: "应用能力", score: 60 + Math.random() * 30, average: 68 },
        { ability: "创新能力", score: 55 + Math.random() * 30, average: 65 },
      ]);

      steps.push({
        id: 6,
        title: "诊断完成",
        content: `认知诊断分析完成！已生成个性化学情报告和学习建议，请查看详细分析结果。`,
        type: "success",
      });
      setAnalysisSteps([...steps]);
    } catch (error) {
      setAnalysisSteps([
        {
          id: 1,
          title: "分析失败",
          content: "数据格式错误，请检查输入的JSON格式是否正确。",
          type: "error",
        },
      ]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Brain className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              智慧教育认知诊断系统
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            基于思维链的可解释AI智能体 · 精准学情分析 · 个性化学习建议
          </p>
        </div>

        {/* 主内容区域 */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* 左侧：输入区域 */}
          <div>
            <StudentInput
              onAnalyze={simulateAnalysis}
              isAnalyzing={isAnalyzing}
            />
          </div>

          {/* 右侧：分析结果 */}
          <div>
            {analysisSteps.length > 0 && (
              <CognitiveAnalysis steps={analysisSteps} />
            )}
          </div>
        </div>

        {/* 诊断报告和数据可视化 */}
        {diagnosisData && (
          <div className="mt-8">
            <Tabs defaultValue="report" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="report" className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  诊断报告
                </TabsTrigger>
                <TabsTrigger value="charts" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  数据分析
                </TabsTrigger>
              </TabsList>

              <TabsContent value="report" className="mt-6">
                <DiagnosisReport data={diagnosisData} />
              </TabsContent>

              <TabsContent value="charts" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <KnowledgeChart data={knowledgeData} />
                  <AbilityAnalysis data={abilityData} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* 空状态提示 */}
        {!isAnalyzing && analysisSteps.length === 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <Brain className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">
              开始智能认知诊断
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              输入学生答题记录，系统将通过可解释的思维链分析，为您提供详细的学情诊断报告和个性化学习建议
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

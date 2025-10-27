import * as fs from "fs";
import * as path from "path";

interface TestResult {
  status: string;
  duration: number;
  title: string;
}

function generateTestSummary(): void {
  const resultsPath = path.join(process.cwd(), "test-results", "results.json");

  if (!fs.existsSync(resultsPath)) {
    console.log(
      " No test results found. Please run tests first: npm test\n"
    );
    return;
  }

  try {
    const resultsData = JSON.parse(fs.readFileSync(resultsPath, "utf-8"));
    const suites = resultsData.suites || [];

    let totalTests = 0;
    let passed = 0;
    let failed = 0;
    let skipped = 0;
    let totalDuration = 0;

    suites.forEach((suite: any) => {
      suite.specs?.forEach((spec: any) => {
        spec.tests?.forEach((test: any) => {
          totalTests++;
          totalDuration += test.results[0]?.duration || 0;

          const status = test.results[0]?.status;
          if (status === "passed") passed++;
          else if (status === "failed") failed++;
          else if (status === "skipped") skipped++;
        });
      });
    });

    const passRate =
      totalTests > 0 ? ((passed / totalTests) * 100).toFixed(1) : "0";
    const durationSeconds = (totalDuration / 1000).toFixed(2);

    console.log(` Total Tests:    ${totalTests}`);
    console.log(` Passed:         ${passed}`);
    console.log(` Failed:         ${failed}`);
    console.log(`  Skipped:        ${skipped}`);
    console.log(`  Duration:       ${durationSeconds}s`);
    console.log(` Pass Rate:      ${passRate}%`);
    console.log(`Status:         ${failed === 0 ? "SUCCESS" : "FAILED"}`);
    console.log("\n════════════════════════════════════════════════════════\n");

  
 
  } catch (error) {
    console.error(" Error reading test results:", error);
  }
}

generateTestSummary();

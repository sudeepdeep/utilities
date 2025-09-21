import React, { useState, useEffect } from "react";
import type { Tool, InputField } from "../types/index.js";

interface SandboxProps {
  tool: Tool;
}

const Sandbox: React.FC<SandboxProps> = ({ tool }) => {
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);

  // Initialize inputs with default values
  useEffect(() => {
    const initialInputs: Record<string, any> = {};
    tool.inputs?.forEach((input) => {
      initialInputs[input.name] = input.defaultValue || "";
    });
    setInputs(initialInputs);
  }, [tool]);

  const handleInputChange = (name: string, value: any) => {
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const executeCode = async () => {
    setIsRunning(true);
    setError("");
    setOutput("");

    try {
      // Create a safe execution environment
      const consoleOutput: string[] = [];
      const mockConsole = {
        log: (...args: any[]) => {
          consoleOutput.push(
            args
              .map((arg) =>
                typeof arg === "object"
                  ? JSON.stringify(arg, null, 2)
                  : String(arg)
              )
              .join(" ")
          );
        },
        error: (...args: any[]) => {
          consoleOutput.push(
            "ERROR: " + args.map((arg) => String(arg)).join(" ")
          );
        },
        warn: (...args: any[]) => {
          consoleOutput.push(
            "WARN: " + args.map((arg) => String(arg)).join(" ")
          );
        },
      };

      // Create a simpler approach - just execute the code with inputs as variables
      let executableCode = tool.code;

      // Add input variables at the beginning of the code
      const inputDeclarations: string[] = [];
      tool.inputs?.forEach((input) => {
        const value = inputs[input.name];
        let processedValue = value;

        // Process different input types
        if (input.type === "number") {
          processedValue = Number(value) || 0;
        } else if (
          input.type === "select" &&
          (value === "true" || value === "false")
        ) {
          processedValue = value === "true";
        } else if (typeof value === "string") {
          processedValue = `"${value.replace(/"/g, '\\"')}"`;
        }

        inputDeclarations.push(`const ${input.name} = ${processedValue};`);
      });

      // Prepend input declarations to the code
      if (inputDeclarations.length > 0) {
        executableCode = inputDeclarations.join("\n") + "\n\n" + executableCode;
      }

      // Create execution context
      const executionContext = {
        console: mockConsole,
        Math,
        Date,
        JSON,
        parseInt,
        parseFloat,
        isNaN,
        isFinite,
        encodeURIComponent,
        decodeURIComponent,
        btoa: typeof btoa !== "undefined" ? btoa : (str: string) => btoa(str),
        atob: typeof atob !== "undefined" ? atob : (str: string) => atob(str),
        // Add other safe globals as needed
      };

      // Execute the code in a controlled environment
      const func = new Function(
        ...Object.keys(executionContext),
        `
        "use strict";
        try {
          ${executableCode}
        } catch (error) {
          console.error("Execution error:", error.message);
        }
        `
      );

      func(...Object.values(executionContext));

      setOutput(
        consoleOutput.join("\n") || "Code executed successfully (no output)"
      );
    } catch (err) {
      setError(
        `Execution error: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      setIsRunning(false);
    }
  };

  const renderInput = (input: InputField) => {
    const value = inputs[input.name] || "";
    const inputClasses =
      "w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors";

    switch (input.type) {
      case "textarea":
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(input.name, e.target.value)}
            placeholder={input.placeholder}
            className={`${inputClasses} resize-vertical`}
            rows={4}
          />
        );
      case "select":
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(input.name, e.target.value)}
            className={inputClasses}
          >
            {input.options?.map((option) => (
              <option
                key={option}
                value={option}
                className="bg-slate-700 text-slate-200"
              >
                {option}
              </option>
            ))}
          </select>
        );
      case "number":
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(input.name, e.target.value)}
            placeholder={input.placeholder}
            className={inputClasses}
          />
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(input.name, e.target.value)}
            placeholder={input.placeholder}
            className={inputClasses}
          />
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex">
        {/* Input Panel */}
        {tool.inputs && tool.inputs.length > 0 && (
          <div className="w-1/3 border-r border-slate-700 bg-slate-800">
            <div className="p-6">
              <h3 className="text-lg font-semibold neon-green mb-4">
                Parameters
              </h3>
              <div className="space-y-4">
                {tool.inputs.map((input) => (
                  <div key={input.name}>
                    <label className="block text-sm font-medium text-slate-300 mb-2 capitalize">
                      {input.name.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    {renderInput(input)}
                  </div>
                ))}
              </div>
              <button
                onClick={executeCode}
                disabled={isRunning}
                className="w-full mt-6 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover-lift"
              >
                {isRunning ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Running...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Run Code
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Output Panel */}
        <div
          className={`${
            tool.inputs && tool.inputs.length > 0 ? "flex-1" : "w-full"
          } flex flex-col`}
        >
          <div className="p-6 border-b border-slate-700 bg-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold neon-blue">Output</h3>
              {(!tool.inputs || tool.inputs.length === 0) && (
                <button
                  onClick={executeCode}
                  disabled={isRunning}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover-lift"
                >
                  {isRunning ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Running...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Run Code
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 p-6 bg-gray-900 text-green-400 font-mono text-sm overflow-auto">
            {error ? (
              <div className="text-red-400">
                <div className="font-semibold mb-2">❌ Error:</div>
                <pre className="whitespace-pre-wrap">{error}</pre>
              </div>
            ) : output ? (
              <div>
                <div className="text-green-300 font-semibold mb-2">
                  ✅ Output:
                </div>
                <pre className="whitespace-pre-wrap">{output}</pre>
              </div>
            ) : (
              <div className="text-gray-500 italic">
                Click "Run Code" to see the output here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sandbox;

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: [
      "src/app/experiments/**/*",
      "src/app/blueprints/**/*",
      "src/app/research/**/*"
    ],
    rules: {
      "no-restricted-imports": ["error", {
        "paths": [
          {
            "name": "@react-three/fiber",
            "message": "WebGL is strictly forbidden on SEO Gateway routes."
          },
          {
            "name": "@react-three/drei",
            "message": "WebGL is strictly forbidden on SEO Gateway routes."
          },
          {
            "name": "three",
            "message": "WebGL is strictly forbidden on SEO Gateway routes."
          }
        ],
        "patterns": [
          {
            "group": ["@/components/experiments/renderers/*", "@/components/experiments/renderers"],
            "message": "Do not import 3D renderer components into SEO routes."
          }
        ]
      }]
    }
  }
]);

export default eslintConfig;

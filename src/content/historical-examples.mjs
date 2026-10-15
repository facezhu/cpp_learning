// Generated from preserved learner sources by scripts/prepare-exercises.mjs.
export const historicalExamples={
  "1": {
    "tasks": [
      "输入姓名、年龄、身高，分别选择 string、int、double。",
      "输出三个字段，保留你原有的输入输出顺序。",
      "用另一个姓名与数值重新运行，解释 cin 与 cout 的区别。"
    ],
    "input": "Arthur 18 1.75\n",
    "expected": "Name: Arthur\nAge: 18\nHeight: 1.75",
    "verify": [
      "Name: Arthur",
      "Age: 18",
      "Height: 1.75"
    ],
    "files": [
      {
        "name": "lesson1.cpp",
        "content": "#include <iostream>\r\n#include <string>\r\n\r\nint main()\r\n{\r\n    std::string name;\r\n    int age;\r\n    double height;\r\n\r\n    std::cout << \"Enter your name, age, and height (in meters): \";\r\n    std::cin >> name >> age >> height;\r\n\r\n    std::cout << \"Name: \" << name << \"\\n\";\r\n    std::cout << \"Age: \" << age << \"\\n\";\r\n    std::cout << \"Height: \" << height << \"\\n\";\r\n\r\n    return 0;\r\n}"
      }
    ],
    "starterFiles": [
      {
        "name": "lesson1.cpp",
        "content": "#include <iostream>\r\n#include <string>\r\n\r\nint main()\r\n{\r\n    std::string name;\r\n    int age;\r\n    double height;\r\n\r\n    std::cout << \"Enter your name, age, and height (in meters): \";\r\n    std::cin >> name >> age >> height;\r\n\r\n    std::cout << \"Name: \" << name << \"\\n\";\r\n    std::cout << \"Age: \" << age << \"\\n\";\r\n    std::cout << \"Height: \" << height << \"\\n\";\r\n\r\n    return 0;\r\n}"
      }
    ],
    "code": "#include <iostream>\r\n#include <string>\r\n\r\nint main()\r\n{\r\n    std::string name;\r\n    int age;\r\n    double height;\r\n\r\n    std::cout << \"Enter your name, age, and height (in meters): \";\r\n    std::cin >> name >> age >> height;\r\n\r\n    std::cout << \"Name: \" << name << \"\\n\";\r\n    std::cout << \"Age: \" << age << \"\\n\";\r\n    std::cout << \"Height: \" << height << \"\\n\";\r\n\r\n    return 0;\r\n}",
    "frames": [
      [
        "建立状态",
        [
          [
            "工作源码",
            "lesson1.cpp"
          ],
          [
            "初始条件",
            "按原main初始化"
          ],
          [
            "观察目标",
            "找到 main 入口"
          ]
        ],
        "先阅读自己的原始代码，区分声明与实际运行。",
        []
      ],
      [
        "执行与追踪",
        [
          [
            "本课任务",
            "输入姓名、年龄、身高，分别选择 string、int、double。"
          ],
          [
            "调用顺序",
            "以main中的语句为准"
          ],
          [
            "数据变化",
            "逐步运行并查看变量"
          ]
        ],
        "图解为辅助教学；完整数值和调用步骤见前面的详细讲义。",
        []
      ],
      [
        "核对结果",
        [
          [
            "预期输出",
            "Name: Arthur；Age: 18；Height: 1.75"
          ],
          [
            "参考目录",
            "reference/"
          ],
          [
            "自查",
            "用另一个姓名与数值重新运行，解释 cin 与 cout 的区别。"
          ]
        ],
        "将VS Code实际结果与预期对照，保留自己的代码风格。",
        []
      ]
    ]
  },
  "2": {
    "tasks": [
      "读取总秒数，沿用你的 hours、remainingSeconds、minutes、seconds。",
      "用 / 与 % 分离时、分、秒。",
      "验证 0、59、60、3600、3661；负数拒绝作为选做扩展。"
    ],
    "input": "3661\n",
    "expected": "hours: 1\nminutes: 1\nseconds: 1",
    "verify": [
      "hours: 1",
      "minutes: 1",
      "seconds: 1"
    ],
    "files": [
      {
        "name": "lesson2.cpp",
        "content": "#include <iostream>\r\n\r\nint main() {\r\n    int totalSeconds;\r\n    std::cout << \"Enter total seconds: \";\r\n    std::cin >> totalSeconds;\r\n\r\n    int hours = totalSeconds / 3600;\r\n    int remainingSeconds = totalSeconds % 3600;\r\n    int minutes = remainingSeconds / 60;\r\n    int seconds = remainingSeconds % 60;\r\n\r\n    std::cout << \"hours: \" << hours << std::endl;\r\n    std::cout << \"minutes: \" << minutes << std::endl;\r\n    std::cout << \"seconds: \" << seconds << std::endl;\r\n\r\n    return 0;\r\n}"
      }
    ],
    "starterFiles": [
      {
        "name": "lesson2.cpp",
        "content": "#include <iostream>\r\n\r\nint main() {\r\n    int totalSeconds;\r\n    std::cout << \"Enter total seconds: \";\r\n    std::cin >> totalSeconds;\r\n\r\n    int hours = totalSeconds / 3600;\r\n    int remainingSeconds = totalSeconds % 3600;\r\n    int minutes = remainingSeconds / 60;\r\n    int seconds = remainingSeconds % 60;\r\n\r\n    std::cout << \"hours: \" << hours << std::endl;\r\n    std::cout << \"minutes: \" << minutes << std::endl;\r\n    std::cout << \"seconds: \" << seconds << std::endl;\r\n\r\n    return 0;\r\n}"
      }
    ],
    "code": "#include <iostream>\r\n\r\nint main() {\r\n    int totalSeconds;\r\n    std::cout << \"Enter total seconds: \";\r\n    std::cin >> totalSeconds;\r\n\r\n    int hours = totalSeconds / 3600;\r\n    int remainingSeconds = totalSeconds % 3600;\r\n    int minutes = remainingSeconds / 60;\r\n    int seconds = remainingSeconds % 60;\r\n\r\n    std::cout << \"hours: \" << hours << std::endl;\r\n    std::cout << \"minutes: \" << minutes << std::endl;\r\n    std::cout << \"seconds: \" << seconds << std::endl;\r\n\r\n    return 0;\r\n}",
    "frames": [
      [
        "建立状态",
        [
          [
            "工作源码",
            "lesson2.cpp"
          ],
          [
            "初始条件",
            "按原main初始化"
          ],
          [
            "观察目标",
            "掌握整数除法和取余"
          ]
        ],
        "先阅读自己的原始代码，区分声明与实际运行。",
        []
      ],
      [
        "执行与追踪",
        [
          [
            "本课任务",
            "读取总秒数，沿用你的 hours、remainingSeconds、minutes、seconds。"
          ],
          [
            "调用顺序",
            "以main中的语句为准"
          ],
          [
            "数据变化",
            "逐步运行并查看变量"
          ]
        ],
        "图解为辅助教学；完整数值和调用步骤见前面的详细讲义。",
        []
      ],
      [
        "核对结果",
        [
          [
            "预期输出",
            "hours: 1；minutes: 1；seconds: 1"
          ],
          [
            "参考目录",
            "reference/"
          ],
          [
            "自查",
            "验证 0、59、60、3600、3661；负数拒绝作为选做扩展。"
          ]
        ],
        "将VS Code实际结果与预期对照，保留自己的代码风格。",
        []
      ]
    ]
  },
  "3": {
    "tasks": [
      "沿用你的票价规则：原价50，0–5岁免费，6–17岁半价，60岁起三分之一。",
      "收费分支中会员再减5；免费票不再减。",
      "测试年龄 -1、0、5、6、17、18、59、60 和两种会员状态。"
    ],
    "input": "60\n1\n",
    "expected": "18岁非会员 → 50 yuan\n6岁会员 → 20 yuan\n60岁会员 → 约11.6667 yuan\n0–5岁 → The ticket is free\n负数 → age is invalid",
    "verify": [
      "11.6667"
    ],
    "files": [
      {
        "name": "lesson3.cpp",
        "content": "#include <iostream>\r\n\r\nint main() {\r\n    int age;\r\n    double price = 50;\r\n    bool isMember;\r\n    std::cout << \"Enter your age: \" << std::endl;\r\n    std::cin >> age;\r\n    std::cout << \"Are you a member? (1 for yes, 0 for no): \" << std::endl;\r\n    std::cin >> isMember;\r\n\r\n    if (age < 0 ){\r\n        std::cout << \"age is invalid\" << std::endl;\r\n    }\r\n    else if (age >= 0 && age <= 5){\r\n        std::cout << \"The ticket is free\" << std::endl;\r\n    }\r\n    else if (age >= 6 && age <= 17){\r\n        price = price / 2;\r\n        if (isMember){\r\n            price -= 5;\r\n        }\r\n        std::cout << \"The ticket price is \" << price << \" yuan\" << std::endl; \r\n    }\r\n    else if (age >= 18 && age <= 59){\r\n        if (isMember){\r\n            price -= 5;\r\n        }\r\n        std::cout << \"The ticket price is \" << price << \" yuan\" << std::endl; \r\n    }\r\n    else if (age >= 60){\r\n        price = price / 3;\r\n        if (isMember){\r\n            price -= 5;\r\n        }\r\n        std::cout << \"The ticket price is \" << price << \" yuan\" << std::endl; \r\n    }\r\n\r\n    return 0;\r\n} "
      }
    ],
    "starterFiles": [
      {
        "name": "lesson3.cpp",
        "content": "#include <iostream>\r\n\r\nint main() {\r\n    int age;\r\n    double price = 50;\r\n    bool isMember;\r\n    std::cout << \"Enter your age: \" << std::endl;\r\n    std::cin >> age;\r\n    std::cout << \"Are you a member? (1 for yes, 0 for no): \" << std::endl;\r\n    std::cin >> isMember;\r\n\r\n    if (age < 0 ){\r\n        std::cout << \"age is invalid\" << std::endl;\r\n    }\r\n    else if (age >= 0 && age <= 5){\r\n        std::cout << \"The ticket is free\" << std::endl;\r\n    }\r\n    else if (age >= 6 && age <= 17){\r\n        price = price / 2;\r\n        if (isMember){\r\n            price -= 5;\r\n        }\r\n        std::cout << \"The ticket price is \" << price << \" yuan\" << std::endl; \r\n    }\r\n    else if (age >= 18 && age <= 59){\r\n        if (isMember){\r\n            price -= 5;\r\n        }\r\n        std::cout << \"The ticket price is \" << price << \" yuan\" << std::endl; \r\n    }\r\n    else if (age >= 60){\r\n        price = price / 3;\r\n        if (isMember){\r\n            price -= 5;\r\n        }\r\n        std::cout << \"The ticket price is \" << price << \" yuan\" << std::endl; \r\n    }\r\n\r\n    return 0;\r\n} "
      }
    ],
    "code": "#include <iostream>\r\n\r\nint main() {\r\n    int age;\r\n    double price = 50;\r\n    bool isMember;\r\n    std::cout << \"Enter your age: \" << std::endl;\r\n    std::cin >> age;\r\n    std::cout << \"Are you a member? (1 for yes, 0 for no): \" << std::endl;\r\n    std::cin >> isMember;\r\n\r\n    if (age < 0 ){\r\n        std::cout << \"age is invalid\" << std::endl;\r\n    }\r\n    else if (age >= 0 && age <= 5){\r\n        std::cout << \"The ticket is free\" << std::endl;\r\n    }\r\n    else if (age >= 6 && age <= 17){\r\n        price = price / 2;\r\n        if (isMember){\r\n            price -= 5;\r\n        }\r\n        std::cout << \"The ticket price is \" << price << \" yuan\" << std::endl; \r\n    }\r\n    else if (age >= 18 && age <= 59){\r\n        if (isMember){\r\n            price -= 5;\r\n        }\r\n        std::cout << \"The ticket price is \" << price << \" yuan\" << std::endl; \r\n    }\r\n    else if (age >= 60){\r\n        price = price / 3;\r\n        if (isMember){\r\n            price -= 5;\r\n        }\r\n        std::cout << \"The ticket price is \" << price << \" yuan\" << std::endl; \r\n    }\r\n\r\n    return 0;\r\n} ",
    "frames": [
      [
        "建立状态",
        [
          [
            "工作源码",
            "lesson3.cpp"
          ],
          [
            "初始条件",
            "按原main初始化"
          ],
          [
            "观察目标",
            "编排 if / else 分支"
          ]
        ],
        "先阅读自己的原始代码，区分声明与实际运行。",
        []
      ],
      [
        "执行与追踪",
        [
          [
            "本课任务",
            "沿用你的票价规则：原价50，0–5岁免费，6–17岁半价，60岁起三分之一。"
          ],
          [
            "调用顺序",
            "以main中的语句为准"
          ],
          [
            "数据变化",
            "逐步运行并查看变量"
          ]
        ],
        "图解为辅助教学；完整数值和调用步骤见前面的详细讲义。",
        []
      ],
      [
        "核对结果",
        [
          [
            "预期输出",
            "11.6667"
          ],
          [
            "参考目录",
            "reference/"
          ],
          [
            "自查",
            "测试年龄 -1、0、5、6、17、18、59、60 和两种会员状态。"
          ]
        ],
        "将VS Code实际结果与预期对照，保留自己的代码风格。",
        []
      ]
    ]
  },
  "4": {
    "tasks": [
      "沿用 while 重输正整数，理解循环何时结束。",
      "用 for 计算1到n的和。",
      "再遍历输出偶数与数量，测试1、3、6；输入0后再输入3检查重试。"
    ],
    "input": "6\n",
    "expected": "The sum of 1 to 6 is: 21\nThe even numbers are: 2 4 6\nThe count of even numbers is: 3",
    "verify": [
      "is: 21",
      "2 4 6",
      "is: 3"
    ],
    "files": [
      {
        "name": "lesson4.cpp",
        "content": "#include <iostream>\r\n\r\nint main() {\r\n    int n;\r\n    int sum = 0;\r\n    int count = 0;\r\n    std::cout << \"Please enter a int number: \";\r\n    std::cin >> n;\r\n    while (n <= 0)\r\n    {\r\n        std::cout << \"The number must be > 0, please enter again: \" << std::endl;\r\n        std::cin >> n;\r\n    }\r\n\r\n    for (int i = 1; i <= n; i++)\r\n    {\r\n        sum += i;\r\n    }\r\n    std::cout << \"The sum of 1 to \" << n << \" is: \" << sum << std::endl;\r\n\r\n    std::cout << \"The even numbers are: \";\r\n    for (int i = 1; i <= n; i++)\r\n    {\r\n        if (i % 2 == 0)\r\n        {\r\n            std::cout << i << \" \";\r\n            count++;\r\n        }\r\n    }\r\n    std::cout << std::endl;\r\n\r\n    std::cout << \"The count of even numbers is: \" << count << std::endl;\r\n\r\n    return 0;\r\n}"
      }
    ],
    "starterFiles": [
      {
        "name": "lesson4.cpp",
        "content": "#include <iostream>\r\n\r\nint main() {\r\n    int n;\r\n    int sum = 0;\r\n    int count = 0;\r\n    std::cout << \"Please enter a int number: \";\r\n    std::cin >> n;\r\n    while (n <= 0)\r\n    {\r\n        std::cout << \"The number must be > 0, please enter again: \" << std::endl;\r\n        std::cin >> n;\r\n    }\r\n\r\n    for (int i = 1; i <= n; i++)\r\n    {\r\n        sum += i;\r\n    }\r\n    std::cout << \"The sum of 1 to \" << n << \" is: \" << sum << std::endl;\r\n\r\n    std::cout << \"The even numbers are: \";\r\n    for (int i = 1; i <= n; i++)\r\n    {\r\n        if (i % 2 == 0)\r\n        {\r\n            std::cout << i << \" \";\r\n            count++;\r\n        }\r\n    }\r\n    std::cout << std::endl;\r\n\r\n    std::cout << \"The count of even numbers is: \" << count << std::endl;\r\n\r\n    return 0;\r\n}"
      }
    ],
    "code": "#include <iostream>\r\n\r\nint main() {\r\n    int n;\r\n    int sum = 0;\r\n    int count = 0;\r\n    std::cout << \"Please enter a int number: \";\r\n    std::cin >> n;\r\n    while (n <= 0)\r\n    {\r\n        std::cout << \"The number must be > 0, please enter again: \" << std::endl;\r\n        std::cin >> n;\r\n    }\r\n\r\n    for (int i = 1; i <= n; i++)\r\n    {\r\n        sum += i;\r\n    }\r\n    std::cout << \"The sum of 1 to \" << n << \" is: \" << sum << std::endl;\r\n\r\n    std::cout << \"The even numbers are: \";\r\n    for (int i = 1; i <= n; i++)\r\n    {\r\n        if (i % 2 == 0)\r\n        {\r\n            std::cout << i << \" \";\r\n            count++;\r\n        }\r\n    }\r\n    std::cout << std::endl;\r\n\r\n    std::cout << \"The count of even numbers is: \" << count << std::endl;\r\n\r\n    return 0;\r\n}",
    "frames": [
      [
        "建立状态",
        [
          [
            "工作源码",
            "lesson4.cpp"
          ],
          [
            "初始条件",
            "按原main初始化"
          ],
          [
            "观察目标",
            "读懂 for 与 while"
          ]
        ],
        "先阅读自己的原始代码，区分声明与实际运行。",
        []
      ],
      [
        "执行与追踪",
        [
          [
            "本课任务",
            "沿用 while 重输正整数，理解循环何时结束。"
          ],
          [
            "调用顺序",
            "以main中的语句为准"
          ],
          [
            "数据变化",
            "逐步运行并查看变量"
          ]
        ],
        "图解为辅助教学；完整数值和调用步骤见前面的详细讲义。",
        []
      ],
      [
        "核对结果",
        [
          [
            "预期输出",
            "is: 21；2 4 6；is: 3"
          ],
          [
            "参考目录",
            "reference/"
          ],
          [
            "自查",
            "再遍历输出偶数与数量，测试1、3、6；输入0后再输入3检查重试。"
          ]
        ],
        "将VS Code实际结果与预期对照，保留自己的代码风格。",
        []
      ]
    ]
  },
  "5": {
    "tasks": [
      "保留 readPositiveNumber、calculateSum、printEvenNumbers、countEvenNumbers 的职责。",
      "逐个对照声明、调用、定义；解释形参与返回值。",
      "输入6得到总和21与3个偶数；测试输入0后再输入3。"
    ],
    "input": "6\n",
    "expected": "Sum: 21\nEven numbers: 2 4 6\nEven count: 3",
    "verify": [
      "Sum: 21",
      "Even numbers: 2 4 6",
      "Even count: 3"
    ],
    "files": [
      {
        "name": "lesson5.cpp",
        "content": "#include <iostream>\r\n\r\nint readPositiveNumber();\r\nint calculateSum(int n);\r\nvoid printEvenNumbers(int n);\r\nint countEvenNumbers(int n);\r\n\r\nint main()\r\n{\r\n    int n = readPositiveNumber();\r\n    int sum = calculateSum(n);\r\n    int evenCount = countEvenNumbers(n);\r\n\r\n    std::cout << \"Sum: \" << sum << '\\n';\r\n\r\n    printEvenNumbers(n);\r\n\r\n    std::cout << \"Even count: \" << evenCount << '\\n';\r\n\r\n    return 0;\r\n}\r\n\r\nint readPositiveNumber()\r\n{\r\n    int n;\r\n    std::cout << \"Please enter a positive integer: \";\r\n    std::cin >> n;\r\n    while (n <= 0)\r\n    {\r\n        std::cout << \"The number must be > 0, please enter again: \" << std::endl;\r\n        std::cin >> n;\r\n    }\r\n    return n;\r\n}\r\n\r\nint calculateSum(int n)\r\n{\r\n    int sum = 0;\r\n    for (int i = 1; i <= n; i++)\r\n    {\r\n        sum += i;\r\n    }\r\n    return sum;\r\n}\r\n\r\nvoid printEvenNumbers(int n)\r\n{\r\n    std::cout << \"Even numbers: \";\r\n    for (int i = 1; i <= n; i++)\r\n    {\r\n        if (i % 2 == 0)\r\n        {\r\n            std::cout << i << \" \";\r\n        }\r\n    }\r\n    std::cout << '\\n';\r\n}\r\n\r\nint countEvenNumbers(int n)\r\n{\r\n    int count = 0;\r\n    for (int i = 1; i <= n; i++)\r\n    {\r\n        if (i % 2 == 0)\r\n        {\r\n            count++;\r\n        }\r\n    }\r\n    return count;\r\n}"
      }
    ],
    "starterFiles": [
      {
        "name": "lesson5.cpp",
        "content": "#include <iostream>\r\n\r\nint readPositiveNumber();\r\nint calculateSum(int n);\r\nvoid printEvenNumbers(int n);\r\nint countEvenNumbers(int n);\r\n\r\nint main()\r\n{\r\n    int n = readPositiveNumber();\r\n    int sum = calculateSum(n);\r\n    int evenCount = countEvenNumbers(n);\r\n\r\n    std::cout << \"Sum: \" << sum << '\\n';\r\n\r\n    printEvenNumbers(n);\r\n\r\n    std::cout << \"Even count: \" << evenCount << '\\n';\r\n\r\n    return 0;\r\n}\r\n\r\nint readPositiveNumber()\r\n{\r\n    int n;\r\n    std::cout << \"Please enter a positive integer: \";\r\n    std::cin >> n;\r\n    while (n <= 0)\r\n    {\r\n        std::cout << \"The number must be > 0, please enter again: \" << std::endl;\r\n        std::cin >> n;\r\n    }\r\n    return n;\r\n}\r\n\r\nint calculateSum(int n)\r\n{\r\n    int sum = 0;\r\n    for (int i = 1; i <= n; i++)\r\n    {\r\n        sum += i;\r\n    }\r\n    return sum;\r\n}\r\n\r\nvoid printEvenNumbers(int n)\r\n{\r\n    std::cout << \"Even numbers: \";\r\n    for (int i = 1; i <= n; i++)\r\n    {\r\n        if (i % 2 == 0)\r\n        {\r\n            std::cout << i << \" \";\r\n        }\r\n    }\r\n    std::cout << '\\n';\r\n}\r\n\r\nint countEvenNumbers(int n)\r\n{\r\n    int count = 0;\r\n    for (int i = 1; i <= n; i++)\r\n    {\r\n        if (i % 2 == 0)\r\n        {\r\n            count++;\r\n        }\r\n    }\r\n    return count;\r\n}"
      }
    ],
    "code": "#include <iostream>\r\n\r\nint readPositiveNumber();\r\nint calculateSum(int n);\r\nvoid printEvenNumbers(int n);\r\nint countEvenNumbers(int n);\r\n\r\nint main()\r\n{\r\n    int n = readPositiveNumber();\r\n    int sum = calculateSum(n);\r\n    int evenCount = countEvenNumbers(n);\r\n\r\n    std::cout << \"Sum: \" << sum << '\\n';\r\n\r\n    printEvenNumbers(n);\r\n\r\n    std::cout << \"Even count: \" << evenCount << '\\n';\r\n\r\n    return 0;\r\n}\r\n\r\nint readPositiveNumber()\r\n{\r\n    int n;\r\n    std::cout << \"Please enter a positive integer: \";\r\n    std::cin >> n;\r\n    while (n <= 0)\r\n    {\r\n        std::cout << \"The number must be > 0, please enter again: \" << std::endl;\r\n        std::cin >> n;\r\n    }\r\n    return n;\r\n}\r\n\r\nint calculateSum(int n)\r\n{\r\n    int sum = 0;\r\n    for (int i = 1; i <= n; i++)\r\n    {\r\n        sum += i;\r\n    }\r\n    return sum;\r\n}\r\n\r\nvoid printEvenNumbers(int n)\r\n{\r\n    std::cout << \"Even numbers: \";\r\n    for (int i = 1; i <= n; i++)\r\n    {\r\n        if (i % 2 == 0)\r\n        {\r\n            std::cout << i << \" \";\r\n        }\r\n    }\r\n    std::cout << '\\n';\r\n}\r\n\r\nint countEvenNumbers(int n)\r\n{\r\n    int count = 0;\r\n    for (int i = 1; i <= n; i++)\r\n    {\r\n        if (i % 2 == 0)\r\n        {\r\n            count++;\r\n        }\r\n    }\r\n    return count;\r\n}",
    "frames": [
      [
        "建立状态",
        [
          [
            "工作源码",
            "lesson5.cpp"
          ],
          [
            "初始条件",
            "按原main初始化"
          ],
          [
            "观察目标",
            "区分声明、定义、调用"
          ]
        ],
        "先阅读自己的原始代码，区分声明与实际运行。",
        []
      ],
      [
        "执行与追踪",
        [
          [
            "本课任务",
            "保留 readPositiveNumber、calculateSum、printEvenNumbers、countEvenNumbers 的职责。"
          ],
          [
            "调用顺序",
            "以main中的语句为准"
          ],
          [
            "数据变化",
            "逐步运行并查看变量"
          ]
        ],
        "图解为辅助教学；完整数值和调用步骤见前面的详细讲义。",
        []
      ],
      [
        "核对结果",
        [
          [
            "预期输出",
            "Sum: 21；Even numbers: 2 4 6；Even count: 3"
          ],
          [
            "参考目录",
            "reference/"
          ],
          [
            "自查",
            "输入6得到总和21与3个偶数；测试输入0后再输入3。"
          ]
        ],
        "将VS Code实际结果与预期对照，保留自己的代码风格。",
        []
      ]
    ]
  },
  "6": {
    "tasks": [
      "保留你的成绩录入、逐个重输非法成绩和统计函数。",
      "对照 reference 修复声明与定义的 const 引用不一致，理解为何产生链接错误。",
      "输入3个成绩80、90、100，检查总分、平均、最高与最低。"
    ],
    "input": "3\n80\n90\n100\n",
    "expected": "Total score: 270\nAverage score: 90\nHighest score: 100\nLowest score: 80\n原文件的4处只读函数定义与声明签名不一致，修正版见reference。",
    "verify": [
      "Total score: 270",
      "Average score: 90",
      "Highest score: 100",
      "Lowest score: 80"
    ],
    "files": [
      {
        "name": "lesson6.cpp",
        "content": "#include <iostream>\r\n#include <vector>\r\n\r\nint readStudentCount();\r\nvoid printStudentScores(const std::vector<int>& scores);\r\nint calculateTotalScore(const std::vector<int>& scores);\r\ndouble calculateAverageScore(int sum, std::vector<int>& scores);\r\nint findHighestScore(const std::vector<int>& scores);\r\nint findLowestScore(const std::vector<int>& scores);\r\n\r\nint main()\r\n{\r\n    int studentCount = readStudentCount();\r\n    std::vector<int> scores;\r\n\r\n    for (int i = 0; i < studentCount; i++)\r\n    {\r\n        int score;\r\n\r\n        std::cout << \"Please enter the score for student \" << i + 1 << \": \";\r\n        std::cin >> score;\r\n        while (score < 0 || score > 100)\r\n        {\r\n            std::cout << \"The score must be between 0 and 100, please enter again: \" << std::endl;\r\n            std::cin >> score;\r\n        }\r\n\r\n        scores.push_back(score);\r\n    }   \r\n\r\n    int sum = calculateTotalScore(scores);\r\n    double average = calculateAverageScore(sum, scores);\r\n    int highestScore = findHighestScore(scores);\r\n    int lowestScore = findLowestScore(scores);\r\n    \r\n    printStudentScores(scores);\r\n\r\n    std::cout << \"Total score: \" << sum << '\\n';\r\n    std::cout << \"Average score: \" << average << '\\n';\r\n    std::cout << \"Highest score: \" << highestScore << '\\n';\r\n    std::cout << \"Lowest score: \" << lowestScore << '\\n';\r\n\r\n\r\n    return 0;\r\n}\r\n\r\nint readStudentCount()\r\n{\r\n    int studentCount;\r\n    std::cout << \"Please enter the number of students: \";\r\n    std::cin >> studentCount;\r\n    while (studentCount <= 0)\r\n    {\r\n        std::cout << \"The number of students must be > 0, please enter again: \" << std::endl;\r\n        std::cin >> studentCount;\r\n    }\r\n    return studentCount;\r\n}\r\n\r\nvoid printStudentScores(const std::vector<int>& scores)\r\n{\r\n    std::cout << \"All the scores are: \";\r\n    for (int score : scores)\r\n    {\r\n        std::cout << score << \" \";\r\n    }\r\n    std::cout << '\\n';\r\n}\r\n\r\nint calculateTotalScore(const std::vector<int>& scores)\r\n{\r\n    int total = 0;\r\n    for (int score : scores)\r\n    {\r\n        total += score;\r\n    }\r\n    return total;\r\n}\r\n\r\ndouble calculateAverageScore(int sum, std::vector<int>& scores)\r\n{\r\n    double average = static_cast<double>(sum) / scores.size();\r\n    return average;\r\n}\r\n\r\nint findHighestScore(const std::vector<int>& scores)\r\n{\r\n    int highest = scores[0];\r\n    for (int score : scores)\r\n    {\r\n        if (score > highest)\r\n        {\r\n            highest = score;\r\n        }\r\n    }\r\n    return highest;\r\n}\r\n\r\nint findLowestScore(const std::vector<int>& scores)\r\n{\r\n    int lowest = scores[0];\r\n    for (int score : scores)\r\n    {\r\n        if (score < lowest)\r\n        {\r\n            lowest = score;\r\n        }\r\n    }\r\n    return lowest;\r\n}"
      }
    ],
    "starterFiles": [
      {
        "name": "lesson6.cpp",
        "content": "#include <iostream>\r\n#include <vector>\r\n\r\nint readStudentCount();\r\nvoid printStudentScores(const std::vector<int>& scores);\r\nint calculateTotalScore(const std::vector<int>& scores);\r\ndouble calculateAverageScore(int sum, std::vector<int>& scores);\r\nint findHighestScore(const std::vector<int>& scores);\r\nint findLowestScore(const std::vector<int>& scores);\r\n\r\nint main()\r\n{\r\n    int studentCount = readStudentCount();\r\n    std::vector<int> scores;\r\n\r\n    for (int i = 0; i < studentCount; i++)\r\n    {\r\n        int score;\r\n\r\n        std::cout << \"Please enter the score for student \" << i + 1 << \": \";\r\n        std::cin >> score;\r\n        while (score < 0 || score > 100)\r\n        {\r\n            std::cout << \"The score must be between 0 and 100, please enter again: \" << std::endl;\r\n            std::cin >> score;\r\n        }\r\n\r\n        scores.push_back(score);\r\n    }   \r\n\r\n    int sum = calculateTotalScore(scores);\r\n    double average = calculateAverageScore(sum, scores);\r\n    int highestScore = findHighestScore(scores);\r\n    int lowestScore = findLowestScore(scores);\r\n    \r\n    printStudentScores(scores);\r\n\r\n    std::cout << \"Total score: \" << sum << '\\n';\r\n    std::cout << \"Average score: \" << average << '\\n';\r\n    std::cout << \"Highest score: \" << highestScore << '\\n';\r\n    std::cout << \"Lowest score: \" << lowestScore << '\\n';\r\n\r\n\r\n    return 0;\r\n}\r\n\r\nint readStudentCount()\r\n{\r\n    int studentCount;\r\n    std::cout << \"Please enter the number of students: \";\r\n    std::cin >> studentCount;\r\n    while (studentCount <= 0)\r\n    {\r\n        std::cout << \"The number of students must be > 0, please enter again: \" << std::endl;\r\n        std::cin >> studentCount;\r\n    }\r\n    return studentCount;\r\n}\r\n\r\nvoid printStudentScores(const std::vector<int>& scores)\r\n{\r\n    std::cout << \"All the scores are: \";\r\n    for (int score : scores)\r\n    {\r\n        std::cout << score << \" \";\r\n    }\r\n    std::cout << '\\n';\r\n}\r\n\r\nint calculateTotalScore(const std::vector<int>& scores)\r\n{\r\n    int total = 0;\r\n    for (int score : scores)\r\n    {\r\n        total += score;\r\n    }\r\n    return total;\r\n}\r\n\r\ndouble calculateAverageScore(int sum, std::vector<int>& scores)\r\n{\r\n    double average = static_cast<double>(sum) / scores.size();\r\n    return average;\r\n}\r\n\r\nint findHighestScore(const std::vector<int>& scores)\r\n{\r\n    int highest = scores[0];\r\n    for (int score : scores)\r\n    {\r\n        if (score > highest)\r\n        {\r\n            highest = score;\r\n        }\r\n    }\r\n    return highest;\r\n}\r\n\r\nint findLowestScore(const std::vector<int>& scores)\r\n{\r\n    int lowest = scores[0];\r\n    for (int score : scores)\r\n    {\r\n        if (score < lowest)\r\n        {\r\n            lowest = score;\r\n        }\r\n    }\r\n    return lowest;\r\n}"
      }
    ],
    "code": "#include <iostream>\r\n#include <vector>\r\n\r\nint readStudentCount();\r\nvoid printStudentScores(const std::vector<int>& scores);\r\nint calculateTotalScore(const std::vector<int>& scores);\r\ndouble calculateAverageScore(int sum, std::vector<int>& scores);\r\nint findHighestScore(const std::vector<int>& scores);\r\nint findLowestScore(const std::vector<int>& scores);\r\n\r\nint main()\r\n{\r\n    int studentCount = readStudentCount();\r\n    std::vector<int> scores;\r\n\r\n    for (int i = 0; i < studentCount; i++)\r\n    {\r\n        int score;\r\n\r\n        std::cout << \"Please enter the score for student \" << i + 1 << \": \";\r\n        std::cin >> score;\r\n        while (score < 0 || score > 100)\r\n        {\r\n            std::cout << \"The score must be between 0 and 100, please enter again: \" << std::endl;\r\n            std::cin >> score;\r\n        }\r\n\r\n        scores.push_back(score);\r\n    }   \r\n\r\n    int sum = calculateTotalScore(scores);\r\n    double average = calculateAverageScore(sum, scores);\r\n    int highestScore = findHighestScore(scores);\r\n    int lowestScore = findLowestScore(scores);\r\n    \r\n    printStudentScores(scores);\r\n\r\n    std::cout << \"Total score: \" << sum << '\\n';\r\n    std::cout << \"Average score: \" << average << '\\n';\r\n    std::cout << \"Highest score: \" << highestScore << '\\n';\r\n    std::cout << \"Lowest score: \" << lowestScore << '\\n';\r\n\r\n\r\n    return 0;\r\n}\r\n\r\nint readStudentCount()\r\n{\r\n    int studentCount;\r\n    std::cout << \"Please enter the number of students: \";\r\n    std::cin >> studentCount;\r\n    while (studentCount <= 0)\r\n    {\r\n        std::cout << \"The number of students must be > 0, please enter again: \" << std::endl;\r\n        std::cin >> studentCount;\r\n    }\r\n    return studentCount;\r\n}\r\n\r\nvoid printStudentScores(const std::vector<int>& scores)\r\n{\r\n    std::cout << \"All the scores are: \";\r\n    for (int score : scores)\r\n    {\r\n        std::cout << score << \" \";\r\n    }\r\n    std::cout << '\\n';\r\n}\r\n\r\nint calculateTotalScore(const std::vector<int>& scores)\r\n{\r\n    int total = 0;\r\n    for (int score : scores)\r\n    {\r\n        total += score;\r\n    }\r\n    return total;\r\n}\r\n\r\ndouble calculateAverageScore(int sum, std::vector<int>& scores)\r\n{\r\n    double average = static_cast<double>(sum) / scores.size();\r\n    return average;\r\n}\r\n\r\nint findHighestScore(const std::vector<int>& scores)\r\n{\r\n    int highest = scores[0];\r\n    for (int score : scores)\r\n    {\r\n        if (score > highest)\r\n        {\r\n            highest = score;\r\n        }\r\n    }\r\n    return highest;\r\n}\r\n\r\nint findLowestScore(const std::vector<int>& scores)\r\n{\r\n    int lowest = scores[0];\r\n    for (int score : scores)\r\n    {\r\n        if (score < lowest)\r\n        {\r\n            lowest = score;\r\n        }\r\n    }\r\n    return lowest;\r\n}",
    "frames": [
      [
        "建立状态",
        [
          [
            "工作源码",
            "lesson6.cpp"
          ],
          [
            "初始条件",
            "按原main初始化"
          ],
          [
            "观察目标",
            "遍历 vector"
          ]
        ],
        "先阅读自己的原始代码，区分声明与实际运行。",
        []
      ],
      [
        "执行与追踪",
        [
          [
            "本课任务",
            "保留你的成绩录入、逐个重输非法成绩和统计函数。"
          ],
          [
            "调用顺序",
            "以main中的语句为准"
          ],
          [
            "数据变化",
            "逐步运行并查看变量"
          ]
        ],
        "图解为辅助教学；完整数值和调用步骤见前面的详细讲义。",
        []
      ],
      [
        "核对结果",
        [
          [
            "预期输出",
            "Total score: 270；Average score: 90；Highest score: 100；Lowest score: 80"
          ],
          [
            "参考目录",
            "reference/"
          ],
          [
            "自查",
            "输入3个成绩80、90、100，检查总分、平均、最高与最低。"
          ]
        ],
        "将VS Code实际结果与预期对照，保留自己的代码风格。",
        []
      ]
    ]
  },
  "7": {
    "tasks": [
      "保留初始成绩65、78、92、100，输入bonus。",
      "addBonus 用可修改引用改变原vector，超过100截到100。",
      "只读打印与平均使用const引用；对照参考增加空容器平均值保护。"
    ],
    "input": "10\n",
    "expected": "Before: 65 78 92 100\nAfter: 75 88 100 100\nAverage: 90.75",
    "verify": [
      "75 88 100 100",
      "Average: 90.75"
    ],
    "files": [
      {
        "name": "lesson7.cpp",
        "content": "#include <iostream>\r\n#include <vector>\r\n\r\nvoid printScores(\r\n    const std::vector<int>& scores\r\n);\r\n\r\nvoid addBonus(\r\n    std::vector<int>& scores,\r\n    int bonus\r\n);\r\n\r\ndouble calculateAverage(\r\nconst std::vector<int>& scores\r\n);\r\n\r\n\r\nint main(){\r\n    std::vector<int> scores = {65, 78, 92, 100};\r\n    std::cout << \"Before: \";\r\n    printScores(scores);\r\n\r\n    int bonus;\r\n    std::cout << \"Enter bonus: \";\r\n    std::cin >> bonus;\r\n    addBonus(scores, bonus);\r\n    \r\n    std::cout << \"After: \";\r\n    printScores(scores);\r\n\r\n    double average = calculateAverage(scores);\r\n    std::cout << \"Average: \" << average << std::endl;\r\n\r\n    return 0;\r\n}\r\n\r\nvoid printScores(\r\n    const std::vector<int>& scores\r\n){\r\n    for (const int& score : scores) {\r\n        std::cout << score << \" \";\r\n    }\r\n    std::cout << std::endl;\r\n}\r\n\r\nvoid addBonus(\r\n    std::vector<int>& scores,\r\n    int bonus\r\n){\r\n    for (int& score : scores) {\r\n        score += bonus;\r\n\r\n        if (score > 100)\r\n        {\r\n            score = 100;\r\n        }\r\n    }\r\n}\r\n\r\ndouble calculateAverage(\r\n    const std::vector<int>& scores\r\n){\r\n    if (scores.empty()) return 0.0; // Empty scores have no arithmetic mean; this exercise uses 0.\n    int sum = 0;\r\n    for (const int& score : scores) {\r\n        sum += score;\r\n    }\r\n    return static_cast<double>(sum) / scores.size();\r\n}"
      }
    ],
    "starterFiles": [
      {
        "name": "lesson7.cpp",
        "content": "#include <iostream>\r\n#include <vector>\r\n\r\nvoid printScores(\r\n    const std::vector<int>& scores\r\n);\r\n\r\nvoid addBonus(\r\n    std::vector<int>& scores,\r\n    int bonus\r\n);\r\n\r\ndouble calculateAverage(\r\nconst std::vector<int>& scores\r\n);\r\n\r\n\r\nint main(){\r\n    std::vector<int> scores = {65, 78, 92, 100};\r\n    std::cout << \"Before: \";\r\n    printScores(scores);\r\n\r\n    int bonus;\r\n    std::cout << \"Enter bonus: \";\r\n    std::cin >> bonus;\r\n    addBonus(scores, bonus);\r\n    \r\n    std::cout << \"After: \";\r\n    printScores(scores);\r\n\r\n    double average = calculateAverage(scores);\r\n    std::cout << \"Average: \" << average << std::endl;\r\n\r\n    return 0;\r\n}\r\n\r\nvoid printScores(\r\n    const std::vector<int>& scores\r\n){\r\n    for (const int& score : scores) {\r\n        std::cout << score << \" \";\r\n    }\r\n    std::cout << std::endl;\r\n}\r\n\r\nvoid addBonus(\r\n    std::vector<int>& scores,\r\n    int bonus\r\n){\r\n    for (int& score : scores) {\r\n        score += bonus;\r\n\r\n        if (score > 100)\r\n        {\r\n            score = 100;\r\n        }\r\n    }\r\n}\r\n\r\ndouble calculateAverage(\r\n    const std::vector<int>& scores\r\n){\r\n    if (scores.empty()) return 0.0; // Empty scores have no arithmetic mean; this exercise uses 0.\n    int sum = 0;\r\n    for (const int& score : scores) {\r\n        sum += score;\r\n    }\r\n    return static_cast<double>(sum) / scores.size();\r\n}"
      }
    ],
    "code": "#include <iostream>\r\n#include <vector>\r\n\r\nvoid printScores(\r\n    const std::vector<int>& scores\r\n);\r\n\r\nvoid addBonus(\r\n    std::vector<int>& scores,\r\n    int bonus\r\n);\r\n\r\ndouble calculateAverage(\r\nconst std::vector<int>& scores\r\n);\r\n\r\n\r\nint main(){\r\n    std::vector<int> scores = {65, 78, 92, 100};\r\n    std::cout << \"Before: \";\r\n    printScores(scores);\r\n\r\n    int bonus;\r\n    std::cout << \"Enter bonus: \";\r\n    std::cin >> bonus;\r\n    addBonus(scores, bonus);\r\n    \r\n    std::cout << \"After: \";\r\n    printScores(scores);\r\n\r\n    double average = calculateAverage(scores);\r\n    std::cout << \"Average: \" << average << std::endl;\r\n\r\n    return 0;\r\n}\r\n\r\nvoid printScores(\r\n    const std::vector<int>& scores\r\n){\r\n    for (const int& score : scores) {\r\n        std::cout << score << \" \";\r\n    }\r\n    std::cout << std::endl;\r\n}\r\n\r\nvoid addBonus(\r\n    std::vector<int>& scores,\r\n    int bonus\r\n){\r\n    for (int& score : scores) {\r\n        score += bonus;\r\n\r\n        if (score > 100)\r\n        {\r\n            score = 100;\r\n        }\r\n    }\r\n}\r\n\r\ndouble calculateAverage(\r\n    const std::vector<int>& scores\r\n){\r\n    if (scores.empty()) return 0.0; // Empty scores have no arithmetic mean; this exercise uses 0.\n    int sum = 0;\r\n    for (const int& score : scores) {\r\n        sum += score;\r\n    }\r\n    return static_cast<double>(sum) / scores.size();\r\n}",
    "frames": [
      [
        "建立状态",
        [
          [
            "工作源码",
            "lesson7.cpp"
          ],
          [
            "初始条件",
            "按原main初始化"
          ],
          [
            "观察目标",
            "比较值传递与引用传递"
          ]
        ],
        "先阅读自己的原始代码，区分声明与实际运行。",
        []
      ],
      [
        "执行与追踪",
        [
          [
            "本课任务",
            "保留初始成绩65、78、92、100，输入bonus。"
          ],
          [
            "调用顺序",
            "以main中的语句为准"
          ],
          [
            "数据变化",
            "逐步运行并查看变量"
          ]
        ],
        "图解为辅助教学；完整数值和调用步骤见前面的详细讲义。",
        []
      ],
      [
        "核对结果",
        [
          [
            "预期输出",
            "75 88 100 100；Average: 90.75"
          ],
          [
            "参考目录",
            "reference/"
          ],
          [
            "自查",
            "只读打印与平均使用const引用；对照参考增加空容器平均值保护。"
          ]
        ],
        "将VS Code实际结果与预期对照，保留自己的代码风格。",
        []
      ]
    ]
  },
  "8": {
    "tasks": [
      "保留 applyDamage(int*)、healPlayer(int&) 和 printHealth(const int*)。",
      "依次打印100、伤害30后的70、治疗15后的85。",
      "传入nullptr输出No player data；解释指针的*、&与引用的&。"
    ],
    "expected": "Health: 100\nHealth: 70\nHealth: 85\nNo player data",
    "verify": [
      "Health: 100",
      "Health: 70",
      "Health: 85",
      "No player data"
    ],
    "files": [
      {
        "name": "lesson8.cpp",
        "content": "#include <iostream>\r\n\r\nvoid applyDamage(int* health, int damage);\r\nvoid healPlayer(int& health, int amount);\r\nvoid printHealth(const int* health);\r\n\r\nint main()\r\n{\r\n    int playerHealth = 100;\r\n\r\n    printHealth(&playerHealth);\r\n\r\n    applyDamage(&playerHealth, 30);\r\n    printHealth(&playerHealth);\r\n\r\n    healPlayer(playerHealth, 15);\r\n    printHealth(&playerHealth);\r\n\r\n    printHealth(nullptr);\r\n    \r\n    return 0;\r\n}\r\n\r\nvoid applyDamage(int* health, int damage)\r\n{\r\n    if (health == nullptr)\r\n    {\r\n        return;\r\n    }\r\n\r\n    *health -= damage;\r\n\r\n    if (*health < 0)\r\n    {\r\n        *health = 0;\r\n    }\r\n}\r\n\r\nvoid healPlayer(int& health, int amount)\r\n{\r\n    health += amount;\r\n    \r\n    if (health > 100)\r\n    {\r\n        health = 100;\r\n    }\r\n}\r\n\r\nvoid printHealth(const int* health){\r\n    if (health == nullptr){\r\n        std::cout << \"No player data\" << std::endl;\r\n        return;\r\n    }\r\n\r\n    std::cout << \"Health: \" << *health << std::endl;\r\n}"
      }
    ],
    "starterFiles": [
      {
        "name": "lesson8.cpp",
        "content": "#include <iostream>\r\n\r\nvoid applyDamage(int* health, int damage);\r\nvoid healPlayer(int& health, int amount);\r\nvoid printHealth(const int* health);\r\n\r\nint main()\r\n{\r\n    int playerHealth = 100;\r\n\r\n    printHealth(&playerHealth);\r\n\r\n    applyDamage(&playerHealth, 30);\r\n    printHealth(&playerHealth);\r\n\r\n    healPlayer(playerHealth, 15);\r\n    printHealth(&playerHealth);\r\n\r\n    printHealth(nullptr);\r\n    \r\n    return 0;\r\n}\r\n\r\nvoid applyDamage(int* health, int damage)\r\n{\r\n    if (health == nullptr)\r\n    {\r\n        return;\r\n    }\r\n\r\n    *health -= damage;\r\n\r\n    if (*health < 0)\r\n    {\r\n        *health = 0;\r\n    }\r\n}\r\n\r\nvoid healPlayer(int& health, int amount)\r\n{\r\n    health += amount;\r\n    \r\n    if (health > 100)\r\n    {\r\n        health = 100;\r\n    }\r\n}\r\n\r\nvoid printHealth(const int* health){\r\n    if (health == nullptr){\r\n        std::cout << \"No player data\" << std::endl;\r\n        return;\r\n    }\r\n\r\n    std::cout << \"Health: \" << *health << std::endl;\r\n}"
      }
    ],
    "code": "#include <iostream>\r\n\r\nvoid applyDamage(int* health, int damage);\r\nvoid healPlayer(int& health, int amount);\r\nvoid printHealth(const int* health);\r\n\r\nint main()\r\n{\r\n    int playerHealth = 100;\r\n\r\n    printHealth(&playerHealth);\r\n\r\n    applyDamage(&playerHealth, 30);\r\n    printHealth(&playerHealth);\r\n\r\n    healPlayer(playerHealth, 15);\r\n    printHealth(&playerHealth);\r\n\r\n    printHealth(nullptr);\r\n    \r\n    return 0;\r\n}\r\n\r\nvoid applyDamage(int* health, int damage)\r\n{\r\n    if (health == nullptr)\r\n    {\r\n        return;\r\n    }\r\n\r\n    *health -= damage;\r\n\r\n    if (*health < 0)\r\n    {\r\n        *health = 0;\r\n    }\r\n}\r\n\r\nvoid healPlayer(int& health, int amount)\r\n{\r\n    health += amount;\r\n    \r\n    if (health > 100)\r\n    {\r\n        health = 100;\r\n    }\r\n}\r\n\r\nvoid printHealth(const int* health){\r\n    if (health == nullptr){\r\n        std::cout << \"No player data\" << std::endl;\r\n        return;\r\n    }\r\n\r\n    std::cout << \"Health: \" << *health << std::endl;\r\n}",
    "frames": [
      [
        "建立状态",
        [
          [
            "工作源码",
            "lesson8.cpp"
          ],
          [
            "初始条件",
            "按原main初始化"
          ],
          [
            "观察目标",
            "使用取地址与解引用"
          ]
        ],
        "先阅读自己的原始代码，区分声明与实际运行。",
        []
      ],
      [
        "执行与追踪",
        [
          [
            "本课任务",
            "保留 applyDamage(int*)、healPlayer(int&) 和 printHealth(const int*)。"
          ],
          [
            "调用顺序",
            "以main中的语句为准"
          ],
          [
            "数据变化",
            "逐步运行并查看变量"
          ]
        ],
        "图解为辅助教学；完整数值和调用步骤见前面的详细讲义。",
        []
      ],
      [
        "核对结果",
        [
          [
            "预期输出",
            "Health: 100；Health: 70；Health: 85；No player data"
          ],
          [
            "参考目录",
            "reference/"
          ],
          [
            "自查",
            "传入nullptr输出No player data；解释指针的*、&与引用的&。"
          ]
        ],
        "将VS Code实际结果与预期对照，保留自己的代码风格。",
        []
      ]
    ]
  },
  "9": {
    "tasks": [
      "沿用两个Player和private name/health，提供setName与伤害、治疗、状态接口。",
      "Knight受到30伤害后治疗10；Mage受到120伤害。",
      "打印Knight alive: true和Mage alive: false，解释boolalpha。"
    ],
    "expected": "Name: Knight\nHealth: 80\nName: Mage\nHealth: 0\nKnight alive: true\nMage alive: false",
    "verify": [
      "Health: 80",
      "Health: 0",
      "Knight alive: true",
      "Mage alive: false"
    ],
    "files": [
      {
        "name": "lesson9.cpp",
        "content": "#include <iostream>\r\n#include <string>\r\n\r\nclass Player\r\n{\r\nprivate:\r\n    std::string name = \"Unknown\";\r\n    int health = 100;\r\npublic:\r\n    void setName(const std::string& newName);\r\n    void takeDamage(int damage);\r\n    void heal(int amount);\r\n    void printStatus() const;\r\n    bool isAlive() const;\r\n\r\n};\r\n\r\nvoid Player::setName(const std::string& newName)\r\n{\r\n    name = newName;\r\n}\r\n\r\nvoid Player::takeDamage(int damage)\r\n{\r\n    if (damage <= 0)\r\n    {\r\n        return;\r\n    }\r\n\r\n    health -= damage;\r\n\r\n    if (health < 0)\r\n    {\r\n        health = 0;\r\n    }\r\n}\r\n\r\nvoid Player::heal(int amount)\r\n{\r\n    if (amount <= 0)\r\n    {\r\n        return;\r\n    }\r\n\r\n    health += amount;\r\n\r\n    if (health > 100)\r\n    {\r\n        health = 100;\r\n    }\r\n}\r\n\r\nvoid Player::printStatus() const\r\n{\r\n    std::cout << \"Name: \" << name << \"\\n\";\r\n    std::cout << \"Health: \" << health << \"\\n\";   \r\n}\r\n\r\nbool Player::isAlive() const\r\n{\r\n    return health > 0;\r\n}\r\n\r\nint main(){\r\n    Player player1;\r\n    Player player2;\r\n\r\n    player1.setName(\"Knight\");\r\n    player2.setName(\"Mage\");\r\n\r\n    player1.takeDamage(30);\r\n    player2.takeDamage(120);\r\n\r\n    player1.heal(10);\r\n\r\n    player1.printStatus();\r\n    player2.printStatus();\r\n\r\n    std::cout << std::boolalpha;\r\n    std::cout << \"Knight alive: \" << player1.isAlive() << '\\n';\r\n    std::cout << \"Mage alive: \" << player2.isAlive() << '\\n';\r\n}\r\n"
      }
    ],
    "starterFiles": [
      {
        "name": "lesson9.cpp",
        "content": "#include <iostream>\r\n#include <string>\r\n\r\nclass Player\r\n{\r\nprivate:\r\n    std::string name = \"Unknown\";\r\n    int health = 100;\r\npublic:\r\n    void setName(const std::string& newName);\r\n    void takeDamage(int damage);\r\n    void heal(int amount);\r\n    void printStatus() const;\r\n    bool isAlive() const;\r\n\r\n};\r\n\r\nvoid Player::setName(const std::string& newName)\r\n{\r\n    name = newName;\r\n}\r\n\r\nvoid Player::takeDamage(int damage)\r\n{\r\n    if (damage <= 0)\r\n    {\r\n        return;\r\n    }\r\n\r\n    health -= damage;\r\n\r\n    if (health < 0)\r\n    {\r\n        health = 0;\r\n    }\r\n}\r\n\r\nvoid Player::heal(int amount)\r\n{\r\n    if (amount <= 0)\r\n    {\r\n        return;\r\n    }\r\n\r\n    health += amount;\r\n\r\n    if (health > 100)\r\n    {\r\n        health = 100;\r\n    }\r\n}\r\n\r\nvoid Player::printStatus() const\r\n{\r\n    std::cout << \"Name: \" << name << \"\\n\";\r\n    std::cout << \"Health: \" << health << \"\\n\";   \r\n}\r\n\r\nbool Player::isAlive() const\r\n{\r\n    return health > 0;\r\n}\r\n\r\nint main(){\r\n    Player player1;\r\n    Player player2;\r\n\r\n    player1.setName(\"Knight\");\r\n    player2.setName(\"Mage\");\r\n\r\n    player1.takeDamage(30);\r\n    player2.takeDamage(120);\r\n\r\n    player1.heal(10);\r\n\r\n    player1.printStatus();\r\n    player2.printStatus();\r\n\r\n    std::cout << std::boolalpha;\r\n    std::cout << \"Knight alive: \" << player1.isAlive() << '\\n';\r\n    std::cout << \"Mage alive: \" << player2.isAlive() << '\\n';\r\n}\r\n"
      }
    ],
    "code": "#include <iostream>\r\n#include <string>\r\n\r\nclass Player\r\n{\r\nprivate:\r\n    std::string name = \"Unknown\";\r\n    int health = 100;\r\npublic:\r\n    void setName(const std::string& newName);\r\n    void takeDamage(int damage);\r\n    void heal(int amount);\r\n    void printStatus() const;\r\n    bool isAlive() const;\r\n\r\n};\r\n\r\nvoid Player::setName(const std::string& newName)\r\n{\r\n    name = newName;\r\n}\r\n\r\nvoid Player::takeDamage(int damage)\r\n{\r\n    if (damage <= 0)\r\n    {\r\n        return;\r\n    }\r\n\r\n    health -= damage;\r\n\r\n    if (health < 0)\r\n    {\r\n        health = 0;\r\n    }\r\n}\r\n\r\nvoid Player::heal(int amount)\r\n{\r\n    if (amount <= 0)\r\n    {\r\n        return;\r\n    }\r\n\r\n    health += amount;\r\n\r\n    if (health > 100)\r\n    {\r\n        health = 100;\r\n    }\r\n}\r\n\r\nvoid Player::printStatus() const\r\n{\r\n    std::cout << \"Name: \" << name << \"\\n\";\r\n    std::cout << \"Health: \" << health << \"\\n\";   \r\n}\r\n\r\nbool Player::isAlive() const\r\n{\r\n    return health > 0;\r\n}\r\n\r\nint main(){\r\n    Player player1;\r\n    Player player2;\r\n\r\n    player1.setName(\"Knight\");\r\n    player2.setName(\"Mage\");\r\n\r\n    player1.takeDamage(30);\r\n    player2.takeDamage(120);\r\n\r\n    player1.heal(10);\r\n\r\n    player1.printStatus();\r\n    player2.printStatus();\r\n\r\n    std::cout << std::boolalpha;\r\n    std::cout << \"Knight alive: \" << player1.isAlive() << '\\n';\r\n    std::cout << \"Mage alive: \" << player2.isAlive() << '\\n';\r\n}\r\n",
    "frames": [
      [
        "建立状态",
        [
          [
            "工作源码",
            "lesson9.cpp"
          ],
          [
            "初始条件",
            "按原main初始化"
          ],
          [
            "观察目标",
            "区分类与对象"
          ]
        ],
        "先阅读自己的原始代码，区分声明与实际运行。",
        []
      ],
      [
        "执行与追踪",
        [
          [
            "本课任务",
            "沿用两个Player和private name/health，提供setName与伤害、治疗、状态接口。"
          ],
          [
            "调用顺序",
            "以main中的语句为准"
          ],
          [
            "数据变化",
            "逐步运行并查看变量"
          ]
        ],
        "图解为辅助教学；完整数值和调用步骤见前面的详细讲义。",
        []
      ],
      [
        "核对结果",
        [
          [
            "预期输出",
            "Health: 80；Health: 0；Knight alive: true；Mage alive: false"
          ],
          [
            "参考目录",
            "reference/"
          ],
          [
            "自查",
            "打印Knight alive: true和Mage alive: false，解释boolalpha。"
          ]
        ],
        "将VS Code实际结果与预期对照，保留自己的代码风格。",
        []
      ]
    ]
  },
  "10": {
    "tasks": [
      "保留默认构造和带name/health的构造函数，用初始化列表建立成员。",
      "测试startingHealth为负数及150时的范围修正。",
      "按原main执行伤害与治疗；区分初始值和最终值。"
    ],
    "expected": "默认玩家最终 Health: 80\nKnight最终 Health: 0\nMage从150截到100，最终 Health: 60\nKnight has been defeated.",
    "verify": [
      "Health: 80",
      "Health: 0",
      "Health: 60",
      "Knight has been defeated."
    ],
    "files": [
      {
        "name": "lesson10.cpp",
        "content": "#include <iostream>\r\n#include <string>\r\n\r\nclass Player\r\n{\r\nprivate:\r\n    std::string name;\r\n    int health;\r\npublic:\r\n    Player();\r\n    Player(const std::string& playerName, int startingHealth);\r\n    void takeDamage(int damage);\r\n    void heal(int amount);\r\n    void printStatus() const;\r\n    bool isAlive() const;\r\n\r\n};\r\n\r\nPlayer::Player(): name(\"Unknown\"), health(100)\r\n{\r\n\r\n} \r\n\r\nPlayer::Player(const std::string& playerName, int startingHealth): name(playerName), health(startingHealth)\r\n{\r\n    if (health < 0)\r\n    {\r\n        health = 0;\r\n    }\r\n    else if (health > 100)\r\n    {\r\n        health = 100;\r\n    }\r\n}\r\n\r\n\r\n\r\nvoid Player::takeDamage(int damage)\r\n{\r\n    if (damage <= 0)\r\n    {\r\n        return;\r\n    }\r\n\r\n    health -= damage;\r\n\r\n    if (health < 0)\r\n    {\r\n        health = 0;\r\n    }\r\n}\r\n\r\nvoid Player::heal(int amount)\r\n{\r\n    if (amount <= 0)\r\n    {\r\n        return;\r\n    }\r\n\r\n    health += amount;\r\n\r\n    if (health > 100)\r\n    {\r\n        health = 100;\r\n    }\r\n}\r\n\r\nvoid Player::printStatus() const\r\n{\r\n    std::cout << \"Name: \" << name << \"\\n\";\r\n    std::cout << \"Health: \" << health << \"\\n\";   \r\n}\r\n\r\nbool Player::isAlive() const\r\n{\r\n    return health > 0;\r\n}\r\n\r\nint main(){\r\n    Player player1;\r\n    Player player2(\"Knight\", 80);\r\n    Player player3(\"Mage\", 150);\r\n\r\n    player1.takeDamage(30);\r\n    player2.takeDamage(120);\r\n    player3.takeDamage(40);\r\n\r\n    player1.heal(10);\r\n\r\n    player1.printStatus();\r\n    player2.printStatus();\r\n    player3.printStatus();\r\n\r\n    if (player2.isAlive())\r\n    {\r\n        std::cout << \"Knight is still alive.\\n\";\r\n    }\r\n    else\r\n    {\r\n        std::cout << \"Knight has been defeated.\\n\";\r\n    }\r\n}\r\n"
      }
    ],
    "starterFiles": [
      {
        "name": "lesson10.cpp",
        "content": "#include <iostream>\r\n#include <string>\r\n\r\nclass Player\r\n{\r\nprivate:\r\n    std::string name;\r\n    int health;\r\npublic:\r\n    Player();\r\n    Player(const std::string& playerName, int startingHealth);\r\n    void takeDamage(int damage);\r\n    void heal(int amount);\r\n    void printStatus() const;\r\n    bool isAlive() const;\r\n\r\n};\r\n\r\nPlayer::Player(): name(\"Unknown\"), health(100)\r\n{\r\n\r\n} \r\n\r\nPlayer::Player(const std::string& playerName, int startingHealth): name(playerName), health(startingHealth)\r\n{\r\n    if (health < 0)\r\n    {\r\n        health = 0;\r\n    }\r\n    else if (health > 100)\r\n    {\r\n        health = 100;\r\n    }\r\n}\r\n\r\n\r\n\r\nvoid Player::takeDamage(int damage)\r\n{\r\n    if (damage <= 0)\r\n    {\r\n        return;\r\n    }\r\n\r\n    health -= damage;\r\n\r\n    if (health < 0)\r\n    {\r\n        health = 0;\r\n    }\r\n}\r\n\r\nvoid Player::heal(int amount)\r\n{\r\n    if (amount <= 0)\r\n    {\r\n        return;\r\n    }\r\n\r\n    health += amount;\r\n\r\n    if (health > 100)\r\n    {\r\n        health = 100;\r\n    }\r\n}\r\n\r\nvoid Player::printStatus() const\r\n{\r\n    std::cout << \"Name: \" << name << \"\\n\";\r\n    std::cout << \"Health: \" << health << \"\\n\";   \r\n}\r\n\r\nbool Player::isAlive() const\r\n{\r\n    return health > 0;\r\n}\r\n\r\nint main(){\r\n    Player player1;\r\n    Player player2(\"Knight\", 80);\r\n    Player player3(\"Mage\", 150);\r\n\r\n    player1.takeDamage(30);\r\n    player2.takeDamage(120);\r\n    player3.takeDamage(40);\r\n\r\n    player1.heal(10);\r\n\r\n    player1.printStatus();\r\n    player2.printStatus();\r\n    player3.printStatus();\r\n\r\n    if (player2.isAlive())\r\n    {\r\n        std::cout << \"Knight is still alive.\\n\";\r\n    }\r\n    else\r\n    {\r\n        std::cout << \"Knight has been defeated.\\n\";\r\n    }\r\n}\r\n"
      }
    ],
    "code": "#include <iostream>\r\n#include <string>\r\n\r\nclass Player\r\n{\r\nprivate:\r\n    std::string name;\r\n    int health;\r\npublic:\r\n    Player();\r\n    Player(const std::string& playerName, int startingHealth);\r\n    void takeDamage(int damage);\r\n    void heal(int amount);\r\n    void printStatus() const;\r\n    bool isAlive() const;\r\n\r\n};\r\n\r\nPlayer::Player(): name(\"Unknown\"), health(100)\r\n{\r\n\r\n} \r\n\r\nPlayer::Player(const std::string& playerName, int startingHealth): name(playerName), health(startingHealth)\r\n{\r\n    if (health < 0)\r\n    {\r\n        health = 0;\r\n    }\r\n    else if (health > 100)\r\n    {\r\n        health = 100;\r\n    }\r\n}\r\n\r\n\r\n\r\nvoid Player::takeDamage(int damage)\r\n{\r\n    if (damage <= 0)\r\n    {\r\n        return;\r\n    }\r\n\r\n    health -= damage;\r\n\r\n    if (health < 0)\r\n    {\r\n        health = 0;\r\n    }\r\n}\r\n\r\nvoid Player::heal(int amount)\r\n{\r\n    if (amount <= 0)\r\n    {\r\n        return;\r\n    }\r\n\r\n    health += amount;\r\n\r\n    if (health > 100)\r\n    {\r\n        health = 100;\r\n    }\r\n}\r\n\r\nvoid Player::printStatus() const\r\n{\r\n    std::cout << \"Name: \" << name << \"\\n\";\r\n    std::cout << \"Health: \" << health << \"\\n\";   \r\n}\r\n\r\nbool Player::isAlive() const\r\n{\r\n    return health > 0;\r\n}\r\n\r\nint main(){\r\n    Player player1;\r\n    Player player2(\"Knight\", 80);\r\n    Player player3(\"Mage\", 150);\r\n\r\n    player1.takeDamage(30);\r\n    player2.takeDamage(120);\r\n    player3.takeDamage(40);\r\n\r\n    player1.heal(10);\r\n\r\n    player1.printStatus();\r\n    player2.printStatus();\r\n    player3.printStatus();\r\n\r\n    if (player2.isAlive())\r\n    {\r\n        std::cout << \"Knight is still alive.\\n\";\r\n    }\r\n    else\r\n    {\r\n        std::cout << \"Knight has been defeated.\\n\";\r\n    }\r\n}\r\n",
    "frames": [
      [
        "建立状态",
        [
          [
            "工作源码",
            "lesson10.cpp"
          ],
          [
            "初始条件",
            "按原main初始化"
          ],
          [
            "观察目标",
            "使用构造函数"
          ]
        ],
        "先阅读自己的原始代码，区分声明与实际运行。",
        []
      ],
      [
        "执行与追踪",
        [
          [
            "本课任务",
            "保留默认构造和带name/health的构造函数，用初始化列表建立成员。"
          ],
          [
            "调用顺序",
            "以main中的语句为准"
          ],
          [
            "数据变化",
            "逐步运行并查看变量"
          ]
        ],
        "图解为辅助教学；完整数值和调用步骤见前面的详细讲义。",
        []
      ],
      [
        "核对结果",
        [
          [
            "预期输出",
            "Health: 80；Health: 0；Health: 60；Knight has been defeated."
          ],
          [
            "参考目录",
            "reference/"
          ],
          [
            "自查",
            "按原main执行伤害与治疗；区分初始值和最终值。"
          ]
        ],
        "将VS Code实际结果与预期对照，保留自己的代码风格。",
        []
      ]
    ]
  },
  "11": {
    "tasks": [
      "保留Weapon和Player组合，Iron Sword伤害30、Magic Staff伤害45。",
      "按原main进行三轮相互攻击，追踪双方血量。",
      "通过weapon.getDamage()取伤害；死亡角色不能继续攻击。"
    ],
    "expected": "三轮结束：Knight Health: 0；Mage Health: 10。\n每轮依次为(55,70)、(10,40)、(0,10)，格式见原printStatus。",
    "verify": [
      "Health: 0",
      "Health: 10"
    ],
    "files": [
      {
        "name": "lesson11.cpp",
        "content": "#include <iostream>\r\n#include <string>\r\n\r\nclass Weapon\r\n{\r\nprivate:\r\n    std::string name;\r\n    int damage;\r\npublic:\r\n    Weapon(const std::string& weaponName, int weaponDamage);\r\n\r\n    const std::string& getName() const;\r\n    int getDamage() const;\r\n    void printInfo() const;\r\n};\r\n\r\nWeapon::Weapon(const std::string& weaponName, int weaponDamage): name(weaponName), damage(weaponDamage)\r\n{\r\n    if (damage < 0)\r\n    {\r\n        damage = 0;\r\n    }\r\n}\r\n\r\nconst std::string& Weapon::getName() const\r\n{\r\n    return name;\r\n}\r\n\r\nint Weapon::getDamage() const\r\n{\r\n    return damage;\r\n}\r\n\r\nvoid Weapon::printInfo() const \r\n{\r\n    std::cout << name << \" (\" << damage << \" damage)\" << \"\\n\";\r\n}\r\n\r\nclass Player\r\n{\r\nprivate:\r\n    std::string name;\r\n    int health;\r\n    Weapon weapon;\r\npublic:\r\n    Player(const std::string& playername, const Weapon& startingweapon);\r\n\r\n    void attack(Player& target) const;\r\n    void takeDamage(int damage);\r\n    void printStatus() const;\r\n    bool isAlive() const;\r\n};\r\n\r\nPlayer::Player(const std::string& playername, const Weapon& startingweapon): name(playername), health(100), weapon(startingweapon)\r\n{\r\n}\r\n\r\nvoid Player::attack(Player& target) const{\r\n    if (!isAlive()){\r\n        std::cout << name << \" cannot attack.\" << \"\\n\";\r\n        return;\r\n    }\r\n\r\n    std::cout << name << \" attack with \" << weapon.getName() << \"!\\n\";\r\n\r\n    target.takeDamage(weapon.getDamage());\r\n}\r\n\r\nvoid Player::takeDamage(int damage){\r\n    if (damage <= 0 || !isAlive()){\r\n        return;\r\n    }\r\n\r\n    health -= damage;\r\n\r\n    if (health < 0){\r\n        health = 0;\r\n    }\r\n}\r\n\r\nvoid Player::printStatus() const{\r\n    std::cout << \"Player: \" << name << '\\n';\r\n    std::cout << \"Health: \" << health << '\\n';\r\n    std::cout << \"Weapon: \";\r\n    weapon.printInfo();\r\n\r\n    std::cout << \"\\n\\n\";\r\n}\r\n\r\nbool Player::isAlive() const{\r\n    return health > 0;\r\n}\r\n\r\nint main(){\r\n    Weapon sword(\"Iron Sword\", 30);\r\n    Weapon staff(\"Magic Staff\", 45);\r\n\r\n    Player knight(\"Knight\", sword);\r\n    Player mage(\"Mage\", staff);\r\n\r\n    knight.attack(mage);\r\n    mage.attack(knight);\r\n\r\n    knight.printStatus();\r\n    mage.printStatus();\r\n\r\n    knight.attack(mage);\r\n    mage.attack(knight);\r\n\r\n    knight.printStatus();\r\n    mage.printStatus();\r\n\r\n    knight.attack(mage);\r\n    mage.attack(knight);\r\n\r\n    knight.printStatus();\r\n    mage.printStatus();\r\n}\r\n\r\n"
      }
    ],
    "starterFiles": [
      {
        "name": "lesson11.cpp",
        "content": "#include <iostream>\r\n#include <string>\r\n\r\nclass Weapon\r\n{\r\nprivate:\r\n    std::string name;\r\n    int damage;\r\npublic:\r\n    Weapon(const std::string& weaponName, int weaponDamage);\r\n\r\n    const std::string& getName() const;\r\n    int getDamage() const;\r\n    void printInfo() const;\r\n};\r\n\r\nWeapon::Weapon(const std::string& weaponName, int weaponDamage): name(weaponName), damage(weaponDamage)\r\n{\r\n    if (damage < 0)\r\n    {\r\n        damage = 0;\r\n    }\r\n}\r\n\r\nconst std::string& Weapon::getName() const\r\n{\r\n    return name;\r\n}\r\n\r\nint Weapon::getDamage() const\r\n{\r\n    return damage;\r\n}\r\n\r\nvoid Weapon::printInfo() const \r\n{\r\n    std::cout << name << \" (\" << damage << \" damage)\" << \"\\n\";\r\n}\r\n\r\nclass Player\r\n{\r\nprivate:\r\n    std::string name;\r\n    int health;\r\n    Weapon weapon;\r\npublic:\r\n    Player(const std::string& playername, const Weapon& startingweapon);\r\n\r\n    void attack(Player& target) const;\r\n    void takeDamage(int damage);\r\n    void printStatus() const;\r\n    bool isAlive() const;\r\n};\r\n\r\nPlayer::Player(const std::string& playername, const Weapon& startingweapon): name(playername), health(100), weapon(startingweapon)\r\n{\r\n}\r\n\r\nvoid Player::attack(Player& target) const{\r\n    if (!isAlive()){\r\n        std::cout << name << \" cannot attack.\" << \"\\n\";\r\n        return;\r\n    }\r\n\r\n    std::cout << name << \" attack with \" << weapon.getName() << \"!\\n\";\r\n\r\n    target.takeDamage(weapon.getDamage());\r\n}\r\n\r\nvoid Player::takeDamage(int damage){\r\n    if (damage <= 0 || !isAlive()){\r\n        return;\r\n    }\r\n\r\n    health -= damage;\r\n\r\n    if (health < 0){\r\n        health = 0;\r\n    }\r\n}\r\n\r\nvoid Player::printStatus() const{\r\n    std::cout << \"Player: \" << name << '\\n';\r\n    std::cout << \"Health: \" << health << '\\n';\r\n    std::cout << \"Weapon: \";\r\n    weapon.printInfo();\r\n\r\n    std::cout << \"\\n\\n\";\r\n}\r\n\r\nbool Player::isAlive() const{\r\n    return health > 0;\r\n}\r\n\r\nint main(){\r\n    Weapon sword(\"Iron Sword\", 30);\r\n    Weapon staff(\"Magic Staff\", 45);\r\n\r\n    Player knight(\"Knight\", sword);\r\n    Player mage(\"Mage\", staff);\r\n\r\n    knight.attack(mage);\r\n    mage.attack(knight);\r\n\r\n    knight.printStatus();\r\n    mage.printStatus();\r\n\r\n    knight.attack(mage);\r\n    mage.attack(knight);\r\n\r\n    knight.printStatus();\r\n    mage.printStatus();\r\n\r\n    knight.attack(mage);\r\n    mage.attack(knight);\r\n\r\n    knight.printStatus();\r\n    mage.printStatus();\r\n}\r\n\r\n"
      }
    ],
    "code": "#include <iostream>\r\n#include <string>\r\n\r\nclass Weapon\r\n{\r\nprivate:\r\n    std::string name;\r\n    int damage;\r\npublic:\r\n    Weapon(const std::string& weaponName, int weaponDamage);\r\n\r\n    const std::string& getName() const;\r\n    int getDamage() const;\r\n    void printInfo() const;\r\n};\r\n\r\nWeapon::Weapon(const std::string& weaponName, int weaponDamage): name(weaponName), damage(weaponDamage)\r\n{\r\n    if (damage < 0)\r\n    {\r\n        damage = 0;\r\n    }\r\n}\r\n\r\nconst std::string& Weapon::getName() const\r\n{\r\n    return name;\r\n}\r\n\r\nint Weapon::getDamage() const\r\n{\r\n    return damage;\r\n}\r\n\r\nvoid Weapon::printInfo() const \r\n{\r\n    std::cout << name << \" (\" << damage << \" damage)\" << \"\\n\";\r\n}\r\n\r\nclass Player\r\n{\r\nprivate:\r\n    std::string name;\r\n    int health;\r\n    Weapon weapon;\r\npublic:\r\n    Player(const std::string& playername, const Weapon& startingweapon);\r\n\r\n    void attack(Player& target) const;\r\n    void takeDamage(int damage);\r\n    void printStatus() const;\r\n    bool isAlive() const;\r\n};\r\n\r\nPlayer::Player(const std::string& playername, const Weapon& startingweapon): name(playername), health(100), weapon(startingweapon)\r\n{\r\n}\r\n\r\nvoid Player::attack(Player& target) const{\r\n    if (!isAlive()){\r\n        std::cout << name << \" cannot attack.\" << \"\\n\";\r\n        return;\r\n    }\r\n\r\n    std::cout << name << \" attack with \" << weapon.getName() << \"!\\n\";\r\n\r\n    target.takeDamage(weapon.getDamage());\r\n}\r\n\r\nvoid Player::takeDamage(int damage){\r\n    if (damage <= 0 || !isAlive()){\r\n        return;\r\n    }\r\n\r\n    health -= damage;\r\n\r\n    if (health < 0){\r\n        health = 0;\r\n    }\r\n}\r\n\r\nvoid Player::printStatus() const{\r\n    std::cout << \"Player: \" << name << '\\n';\r\n    std::cout << \"Health: \" << health << '\\n';\r\n    std::cout << \"Weapon: \";\r\n    weapon.printInfo();\r\n\r\n    std::cout << \"\\n\\n\";\r\n}\r\n\r\nbool Player::isAlive() const{\r\n    return health > 0;\r\n}\r\n\r\nint main(){\r\n    Weapon sword(\"Iron Sword\", 30);\r\n    Weapon staff(\"Magic Staff\", 45);\r\n\r\n    Player knight(\"Knight\", sword);\r\n    Player mage(\"Mage\", staff);\r\n\r\n    knight.attack(mage);\r\n    mage.attack(knight);\r\n\r\n    knight.printStatus();\r\n    mage.printStatus();\r\n\r\n    knight.attack(mage);\r\n    mage.attack(knight);\r\n\r\n    knight.printStatus();\r\n    mage.printStatus();\r\n\r\n    knight.attack(mage);\r\n    mage.attack(knight);\r\n\r\n    knight.printStatus();\r\n    mage.printStatus();\r\n}\r\n\r\n",
    "frames": [
      [
        "建立状态",
        [
          [
            "工作源码",
            "lesson11.cpp"
          ],
          [
            "初始条件",
            "按原main初始化"
          ],
          [
            "观察目标",
            "理解has-a关系"
          ]
        ],
        "先阅读自己的原始代码，区分声明与实际运行。",
        []
      ],
      [
        "执行与追踪",
        [
          [
            "本课任务",
            "保留Weapon和Player组合，Iron Sword伤害30、Magic Staff伤害45。"
          ],
          [
            "调用顺序",
            "以main中的语句为准"
          ],
          [
            "数据变化",
            "逐步运行并查看变量"
          ]
        ],
        "图解为辅助教学；完整数值和调用步骤见前面的详细讲义。",
        []
      ],
      [
        "核对结果",
        [
          [
            "预期输出",
            "Health: 0；Health: 10"
          ],
          [
            "参考目录",
            "reference/"
          ],
          [
            "自查",
            "通过weapon.getDamage()取伤害；死亡角色不能继续攻击。"
          ]
        ],
        "将VS Code实际结果与预期对照，保留自己的代码风格。",
        []
      ]
    ]
  },
  "12": {
    "tasks": [
      "保留main.cpp、Player.h/.cpp、Weapon.h/.cpp五个原文件。",
      "只一起编译根目录的main.cpp、Player.cpp、Weapon.cpp。",
      "沿用while战斗与败者不反击的检查，说明头文件与实现分工。"
    ],
    "expected": "Mage wins!\nKnight最终Health: 0\nMage最终Health: 10",
    "verify": [
      "Mage wins!",
      "Health: 0",
      "Health: 10"
    ],
    "files": [
      {
        "name": "Player.cpp",
        "content": "#include \"Player.h\"\r\n#include <iostream>\r\n\r\n\r\nPlayer::Player(const std::string& playername, const Weapon& startingweapon): name(playername), health(100), weapon(startingweapon)\r\n{\r\n}\r\n\r\nvoid Player::attack(Player& target) const{\r\n    if (!isAlive()){\r\n        std::cout << name << \" cannot attack.\" << \"\\n\";\r\n        return;\r\n    }\r\n\r\n    std::cout << name << \" attacks with \" << weapon.getName() << \"!\\n\";\r\n\r\n    target.takeDamage(weapon.getDamage());\r\n}\r\n\r\nvoid Player::takeDamage(int damage){\r\n    if (damage <= 0 || !isAlive()){\r\n        return;\r\n    }\r\n\r\n    health -= damage;\r\n\r\n    if (health < 0){\r\n        health = 0;\r\n    }\r\n}\r\n\r\nvoid Player::printStatus() const{\r\n    std::cout << \"Player: \" << name << '\\n';\r\n    std::cout << \"Health: \" << health << '\\n';\r\n    std::cout << \"Weapon: \";\r\n    weapon.printInfo();\r\n\r\n    std::cout << \"\\n\\n\";\r\n}\r\n\r\nbool Player::isAlive() const{\r\n    return health > 0;\r\n}"
      },
      {
        "name": "Player.h",
        "content": "#pragma once\r\n#include \"Weapon.h\"\r\n#include <string>\r\n\r\n\r\nclass Player\r\n{\r\nprivate:\r\n    std::string name;\r\n    int health;\r\n    Weapon weapon;\r\npublic:\r\n    Player(const std::string& playername, const Weapon& startingweapon);\r\n\r\n    void attack(Player& target) const;\r\n    void takeDamage(int damage);\r\n    void printStatus() const;\r\n    bool isAlive() const;\r\n};"
      },
      {
        "name": "Weapon.cpp",
        "content": "#include \"Weapon.h\"\r\n#include <iostream>\r\n\r\nWeapon::Weapon(const std::string& weaponName, int weaponDamage): name(weaponName), damage(weaponDamage)\r\n{\r\n    if (damage < 0)\r\n    {\r\n        damage = 0;\r\n    }\r\n}\r\n\r\nconst std::string& Weapon::getName() const\r\n{\r\n    return name;\r\n}\r\n\r\nint Weapon::getDamage() const\r\n{\r\n    return damage;\r\n}\r\n\r\nvoid Weapon::printInfo() const \r\n{\r\n    std::cout << name << \" (\" << damage << \" damage)\";\r\n}"
      },
      {
        "name": "Weapon.h",
        "content": "#pragma once\r\n#include <string>\r\n\r\n\r\nclass Weapon\r\n{\r\nprivate:\r\n    std::string name;\r\n    int damage;\r\npublic:\r\n    Weapon(const std::string& weaponName, int weaponDamage);\r\n\r\n    const std::string& getName() const;\r\n    int getDamage() const;\r\n    void printInfo() const;\r\n};"
      },
      {
        "name": "main.cpp",
        "content": "#include \"Player.h\"\r\n#include \"Weapon.h\"\r\n#include <iostream>\r\n\r\nint main()\r\n{\r\n    Weapon sword(\"Iron Sword\", 30);\r\n    Weapon staff(\"Magic Staff\", 45);\r\n\r\n    Player knight(\"Knight\", sword);\r\n    Player mage(\"Mage\", staff);\r\n\r\n    while (knight.isAlive() && mage.isAlive())\r\n    {\r\n        knight.attack(mage);\r\n\r\n        if (mage.isAlive())\r\n        {\r\n            mage.attack(knight);\r\n        }\r\n    }\r\n\r\n    if (knight.isAlive())\r\n    {\r\n        std::cout << \"Knight wins!\\n\";\r\n    }\r\n    else\r\n    {\r\n        std::cout << \"Mage wins!\\n\";\r\n    }    \r\n    \r\n    knight.printStatus();\r\n    mage.printStatus();\r\n\r\n    return 0;\r\n}"
      }
    ],
    "starterFiles": [
      {
        "name": "Player.cpp",
        "content": "#include \"Player.h\"\r\n#include <iostream>\r\n\r\n\r\nPlayer::Player(const std::string& playername, const Weapon& startingweapon): name(playername), health(100), weapon(startingweapon)\r\n{\r\n}\r\n\r\nvoid Player::attack(Player& target) const{\r\n    if (!isAlive()){\r\n        std::cout << name << \" cannot attack.\" << \"\\n\";\r\n        return;\r\n    }\r\n\r\n    std::cout << name << \" attacks with \" << weapon.getName() << \"!\\n\";\r\n\r\n    target.takeDamage(weapon.getDamage());\r\n}\r\n\r\nvoid Player::takeDamage(int damage){\r\n    if (damage <= 0 || !isAlive()){\r\n        return;\r\n    }\r\n\r\n    health -= damage;\r\n\r\n    if (health < 0){\r\n        health = 0;\r\n    }\r\n}\r\n\r\nvoid Player::printStatus() const{\r\n    std::cout << \"Player: \" << name << '\\n';\r\n    std::cout << \"Health: \" << health << '\\n';\r\n    std::cout << \"Weapon: \";\r\n    weapon.printInfo();\r\n\r\n    std::cout << \"\\n\\n\";\r\n}\r\n\r\nbool Player::isAlive() const{\r\n    return health > 0;\r\n}"
      },
      {
        "name": "Player.h",
        "content": "#pragma once\r\n#include \"Weapon.h\"\r\n#include <string>\r\n\r\n\r\nclass Player\r\n{\r\nprivate:\r\n    std::string name;\r\n    int health;\r\n    Weapon weapon;\r\npublic:\r\n    Player(const std::string& playername, const Weapon& startingweapon);\r\n\r\n    void attack(Player& target) const;\r\n    void takeDamage(int damage);\r\n    void printStatus() const;\r\n    bool isAlive() const;\r\n};"
      },
      {
        "name": "Weapon.cpp",
        "content": "#include \"Weapon.h\"\r\n#include <iostream>\r\n\r\nWeapon::Weapon(const std::string& weaponName, int weaponDamage): name(weaponName), damage(weaponDamage)\r\n{\r\n    if (damage < 0)\r\n    {\r\n        damage = 0;\r\n    }\r\n}\r\n\r\nconst std::string& Weapon::getName() const\r\n{\r\n    return name;\r\n}\r\n\r\nint Weapon::getDamage() const\r\n{\r\n    return damage;\r\n}\r\n\r\nvoid Weapon::printInfo() const \r\n{\r\n    std::cout << name << \" (\" << damage << \" damage)\";\r\n}"
      },
      {
        "name": "Weapon.h",
        "content": "#pragma once\r\n#include <string>\r\n\r\n\r\nclass Weapon\r\n{\r\nprivate:\r\n    std::string name;\r\n    int damage;\r\npublic:\r\n    Weapon(const std::string& weaponName, int weaponDamage);\r\n\r\n    const std::string& getName() const;\r\n    int getDamage() const;\r\n    void printInfo() const;\r\n};"
      },
      {
        "name": "main.cpp",
        "content": "#include \"Player.h\"\r\n#include \"Weapon.h\"\r\n#include <iostream>\r\n\r\nint main()\r\n{\r\n    Weapon sword(\"Iron Sword\", 30);\r\n    Weapon staff(\"Magic Staff\", 45);\r\n\r\n    Player knight(\"Knight\", sword);\r\n    Player mage(\"Mage\", staff);\r\n\r\n    while (knight.isAlive() && mage.isAlive())\r\n    {\r\n        knight.attack(mage);\r\n\r\n        if (mage.isAlive())\r\n        {\r\n            mage.attack(knight);\r\n        }\r\n    }\r\n\r\n    if (knight.isAlive())\r\n    {\r\n        std::cout << \"Knight wins!\\n\";\r\n    }\r\n    else\r\n    {\r\n        std::cout << \"Mage wins!\\n\";\r\n    }    \r\n    \r\n    knight.printStatus();\r\n    mage.printStatus();\r\n\r\n    return 0;\r\n}"
      }
    ],
    "code": "#include \"Player.h\"\r\n#include \"Weapon.h\"\r\n#include <iostream>\r\n\r\nint main()\r\n{\r\n    Weapon sword(\"Iron Sword\", 30);\r\n    Weapon staff(\"Magic Staff\", 45);\r\n\r\n    Player knight(\"Knight\", sword);\r\n    Player mage(\"Mage\", staff);\r\n\r\n    while (knight.isAlive() && mage.isAlive())\r\n    {\r\n        knight.attack(mage);\r\n\r\n        if (mage.isAlive())\r\n        {\r\n            mage.attack(knight);\r\n        }\r\n    }\r\n\r\n    if (knight.isAlive())\r\n    {\r\n        std::cout << \"Knight wins!\\n\";\r\n    }\r\n    else\r\n    {\r\n        std::cout << \"Mage wins!\\n\";\r\n    }    \r\n    \r\n    knight.printStatus();\r\n    mage.printStatus();\r\n\r\n    return 0;\r\n}",
    "frames": [
      [
        "建立状态",
        [
          [
            "工作源码",
            "Player.cpp / Player.h / Weapon.cpp / Weapon.h / main.cpp"
          ],
          [
            "初始条件",
            "按原main初始化"
          ],
          [
            "观察目标",
            "分离声明与定义"
          ]
        ],
        "先阅读自己的原始代码，区分声明与实际运行。",
        []
      ],
      [
        "执行与追踪",
        [
          [
            "本课任务",
            "保留main.cpp、Player.h/.cpp、Weapon.h/.cpp五个原文件。"
          ],
          [
            "调用顺序",
            "以main中的语句为准"
          ],
          [
            "数据变化",
            "逐步运行并查看变量"
          ]
        ],
        "图解为辅助教学；完整数值和调用步骤见前面的详细讲义。",
        []
      ],
      [
        "核对结果",
        [
          [
            "预期输出",
            "Mage wins!；Health: 0；Health: 10"
          ],
          [
            "参考目录",
            "reference/"
          ],
          [
            "自查",
            "沿用while战斗与败者不反击的检查，说明头文件与实现分工。"
          ]
        ],
        "将VS Code实际结果与预期对照，保留自己的代码风格。",
        []
      ]
    ]
  },
  "13": {
    "tasks": [
      "保留Character、Warrior、Mage与powerAttack/castSpell接口。",
      "完整追踪Warrior(\"Arthur\")到Character(warriorName,120)再到name/health的初始化。",
      "两轮后检查Arthur生命40、Merlin生命10、Mage mana为60。"
    ],
    "expected": "Name: Arthur\nHealth: 40\nName: Merlin\nHealth: 10\nMage mana: 60",
    "verify": [
      "Health: 40",
      "Health: 10",
      "Mage mana: 60"
    ],
    "files": [
      {
        "name": "lesson13.cpp",
        "content": "#include <iostream>\r\n#include <string>\r\n\r\nclass Character\r\n{\r\nprivate:\r\n    std::string name;\r\n    int health;\r\npublic:\r\n    Character(const std::string& characterName, int characterHealth);\r\n    \r\n    const std::string& getName() const;\r\n    int getHealth() const;\r\n    void takeDamage(int damage);\r\n    void printStatus() const;\r\n    bool isAlive() const;\r\n\r\n};\r\n\r\nCharacter::Character(const std::string& characterName, int characterHealth): name(characterName), health(characterHealth)\r\n{\r\n    if (health < 0){\r\n        health = 0;\r\n    }\r\n}\r\n\r\nconst std::string& Character::getName() const\r\n{\r\n    return name;\r\n}\r\n\r\nint Character::getHealth() const\r\n{\r\n    return health;\r\n}\r\n\r\nvoid Character::takeDamage(int damage)\r\n{\r\n    if (damage <= 0 || !isAlive())\r\n    {\r\n        return;\r\n    }\r\n\r\n    health -= damage;\r\n\r\n    if (health < 0)\r\n    {\r\n        health = 0;\r\n    }\r\n}\r\n\r\nvoid Character::printStatus() const\r\n{\r\n    std::cout << \"Name: \" << name << '\\n';\r\n    std::cout << \"Health: \" << health << '\\n';\r\n}\r\n\r\nbool Character::isAlive() const\r\n{\r\n    return health > 0;\r\n}\r\n\r\nclass Warrior : public Character\r\n{\r\nprivate:\r\n    /* data */\r\npublic:\r\n    Warrior(const std::string& warriorName);\r\n    void powerAttack(Character& target) const;\r\n};\r\n\r\nWarrior::Warrior(const std::string& warriorName): Character(warriorName, 120)\r\n{\r\n}\r\n\r\nvoid Warrior::powerAttack(Character& target) const\r\n{\r\n    if (!isAlive())\r\n    {\r\n        std::cout << getName() << \" cannot attack.\\n\";\r\n        return;\r\n    }\r\n\r\n    std::cout << getName() << \" uses Power Attack!\\n\";\r\n    target.takeDamage(35);\r\n}\r\n\r\nclass Mage : public Character\r\n{\r\nprivate:\r\n    int mana;\r\npublic:\r\n    Mage(const std::string& mageName);\r\n\r\n    void castSpell(Character& target);\r\n    int getMana() const;\r\n};\r\n\r\nMage::Mage(const std::string& mageName) : Character(mageName, 80), mana(100)\r\n{\r\n}\r\n\r\nvoid Mage::castSpell(Character& target)\r\n{\r\n    const int manaCost = 20;\r\n    const int spellDamage = 40;\r\n\r\n    if (!isAlive())\r\n    {\r\n        std::cout << getName() << \" cannot cast.\\n\";\r\n        return;\r\n    }\r\n\r\n    if (mana < manaCost)\r\n    {\r\n        std::cout << getName() << \" does not have enough mana.\\n\";\r\n        return;\r\n    }\r\n\r\n    mana -= manaCost;\r\n\r\n    std::cout << getName() << \" casts a spell!\\n\";\r\n    target.takeDamage(spellDamage);\r\n}\r\n\r\nint Mage::getMana() const\r\n{\r\n    return mana;\r\n}\r\n\r\nint main()\r\n{\r\n    Warrior warrior(\"Arthur\");\r\n    Mage mage(\"Merlin\");\r\n\r\n    warrior.printStatus();\r\n    mage.printStatus();\r\n\r\n    warrior.powerAttack(mage);\r\n    mage.castSpell(warrior);\r\n\r\n    warrior.powerAttack(mage);\r\n    mage.castSpell(warrior);\r\n\r\n    warrior.printStatus();\r\n    mage.printStatus();\r\n\r\n    std::cout << \"Mage mana: \"\r\n              << mage.getMana() << '\\n';\r\n\r\n    return 0;\r\n}\r\n\r\n\r\n\r\n"
      }
    ],
    "starterFiles": [
      {
        "name": "lesson13.cpp",
        "content": "#include <iostream>\r\n#include <string>\r\n\r\nclass Character\r\n{\r\nprivate:\r\n    std::string name;\r\n    int health;\r\npublic:\r\n    Character(const std::string& characterName, int characterHealth);\r\n    \r\n    const std::string& getName() const;\r\n    int getHealth() const;\r\n    void takeDamage(int damage);\r\n    void printStatus() const;\r\n    bool isAlive() const;\r\n\r\n};\r\n\r\nCharacter::Character(const std::string& characterName, int characterHealth): name(characterName), health(characterHealth)\r\n{\r\n    if (health < 0){\r\n        health = 0;\r\n    }\r\n}\r\n\r\nconst std::string& Character::getName() const\r\n{\r\n    return name;\r\n}\r\n\r\nint Character::getHealth() const\r\n{\r\n    return health;\r\n}\r\n\r\nvoid Character::takeDamage(int damage)\r\n{\r\n    if (damage <= 0 || !isAlive())\r\n    {\r\n        return;\r\n    }\r\n\r\n    health -= damage;\r\n\r\n    if (health < 0)\r\n    {\r\n        health = 0;\r\n    }\r\n}\r\n\r\nvoid Character::printStatus() const\r\n{\r\n    std::cout << \"Name: \" << name << '\\n';\r\n    std::cout << \"Health: \" << health << '\\n';\r\n}\r\n\r\nbool Character::isAlive() const\r\n{\r\n    return health > 0;\r\n}\r\n\r\nclass Warrior : public Character\r\n{\r\nprivate:\r\n    /* data */\r\npublic:\r\n    Warrior(const std::string& warriorName);\r\n    void powerAttack(Character& target) const;\r\n};\r\n\r\nWarrior::Warrior(const std::string& warriorName): Character(warriorName, 120)\r\n{\r\n}\r\n\r\nvoid Warrior::powerAttack(Character& target) const\r\n{\r\n    if (!isAlive())\r\n    {\r\n        std::cout << getName() << \" cannot attack.\\n\";\r\n        return;\r\n    }\r\n\r\n    std::cout << getName() << \" uses Power Attack!\\n\";\r\n    target.takeDamage(35);\r\n}\r\n\r\nclass Mage : public Character\r\n{\r\nprivate:\r\n    int mana;\r\npublic:\r\n    Mage(const std::string& mageName);\r\n\r\n    void castSpell(Character& target);\r\n    int getMana() const;\r\n};\r\n\r\nMage::Mage(const std::string& mageName) : Character(mageName, 80), mana(100)\r\n{\r\n}\r\n\r\nvoid Mage::castSpell(Character& target)\r\n{\r\n    const int manaCost = 20;\r\n    const int spellDamage = 40;\r\n\r\n    if (!isAlive())\r\n    {\r\n        std::cout << getName() << \" cannot cast.\\n\";\r\n        return;\r\n    }\r\n\r\n    if (mana < manaCost)\r\n    {\r\n        std::cout << getName() << \" does not have enough mana.\\n\";\r\n        return;\r\n    }\r\n\r\n    mana -= manaCost;\r\n\r\n    std::cout << getName() << \" casts a spell!\\n\";\r\n    target.takeDamage(spellDamage);\r\n}\r\n\r\nint Mage::getMana() const\r\n{\r\n    return mana;\r\n}\r\n\r\nint main()\r\n{\r\n    Warrior warrior(\"Arthur\");\r\n    Mage mage(\"Merlin\");\r\n\r\n    warrior.printStatus();\r\n    mage.printStatus();\r\n\r\n    warrior.powerAttack(mage);\r\n    mage.castSpell(warrior);\r\n\r\n    warrior.powerAttack(mage);\r\n    mage.castSpell(warrior);\r\n\r\n    warrior.printStatus();\r\n    mage.printStatus();\r\n\r\n    std::cout << \"Mage mana: \"\r\n              << mage.getMana() << '\\n';\r\n\r\n    return 0;\r\n}\r\n\r\n\r\n\r\n"
      }
    ],
    "code": "#include <iostream>\r\n#include <string>\r\n\r\nclass Character\r\n{\r\nprivate:\r\n    std::string name;\r\n    int health;\r\npublic:\r\n    Character(const std::string& characterName, int characterHealth);\r\n    \r\n    const std::string& getName() const;\r\n    int getHealth() const;\r\n    void takeDamage(int damage);\r\n    void printStatus() const;\r\n    bool isAlive() const;\r\n\r\n};\r\n\r\nCharacter::Character(const std::string& characterName, int characterHealth): name(characterName), health(characterHealth)\r\n{\r\n    if (health < 0){\r\n        health = 0;\r\n    }\r\n}\r\n\r\nconst std::string& Character::getName() const\r\n{\r\n    return name;\r\n}\r\n\r\nint Character::getHealth() const\r\n{\r\n    return health;\r\n}\r\n\r\nvoid Character::takeDamage(int damage)\r\n{\r\n    if (damage <= 0 || !isAlive())\r\n    {\r\n        return;\r\n    }\r\n\r\n    health -= damage;\r\n\r\n    if (health < 0)\r\n    {\r\n        health = 0;\r\n    }\r\n}\r\n\r\nvoid Character::printStatus() const\r\n{\r\n    std::cout << \"Name: \" << name << '\\n';\r\n    std::cout << \"Health: \" << health << '\\n';\r\n}\r\n\r\nbool Character::isAlive() const\r\n{\r\n    return health > 0;\r\n}\r\n\r\nclass Warrior : public Character\r\n{\r\nprivate:\r\n    /* data */\r\npublic:\r\n    Warrior(const std::string& warriorName);\r\n    void powerAttack(Character& target) const;\r\n};\r\n\r\nWarrior::Warrior(const std::string& warriorName): Character(warriorName, 120)\r\n{\r\n}\r\n\r\nvoid Warrior::powerAttack(Character& target) const\r\n{\r\n    if (!isAlive())\r\n    {\r\n        std::cout << getName() << \" cannot attack.\\n\";\r\n        return;\r\n    }\r\n\r\n    std::cout << getName() << \" uses Power Attack!\\n\";\r\n    target.takeDamage(35);\r\n}\r\n\r\nclass Mage : public Character\r\n{\r\nprivate:\r\n    int mana;\r\npublic:\r\n    Mage(const std::string& mageName);\r\n\r\n    void castSpell(Character& target);\r\n    int getMana() const;\r\n};\r\n\r\nMage::Mage(const std::string& mageName) : Character(mageName, 80), mana(100)\r\n{\r\n}\r\n\r\nvoid Mage::castSpell(Character& target)\r\n{\r\n    const int manaCost = 20;\r\n    const int spellDamage = 40;\r\n\r\n    if (!isAlive())\r\n    {\r\n        std::cout << getName() << \" cannot cast.\\n\";\r\n        return;\r\n    }\r\n\r\n    if (mana < manaCost)\r\n    {\r\n        std::cout << getName() << \" does not have enough mana.\\n\";\r\n        return;\r\n    }\r\n\r\n    mana -= manaCost;\r\n\r\n    std::cout << getName() << \" casts a spell!\\n\";\r\n    target.takeDamage(spellDamage);\r\n}\r\n\r\nint Mage::getMana() const\r\n{\r\n    return mana;\r\n}\r\n\r\nint main()\r\n{\r\n    Warrior warrior(\"Arthur\");\r\n    Mage mage(\"Merlin\");\r\n\r\n    warrior.printStatus();\r\n    mage.printStatus();\r\n\r\n    warrior.powerAttack(mage);\r\n    mage.castSpell(warrior);\r\n\r\n    warrior.powerAttack(mage);\r\n    mage.castSpell(warrior);\r\n\r\n    warrior.printStatus();\r\n    mage.printStatus();\r\n\r\n    std::cout << \"Mage mana: \"\r\n              << mage.getMana() << '\\n';\r\n\r\n    return 0;\r\n}\r\n\r\n\r\n\r\n",
    "frames": [
      [
        "建立状态",
        [
          [
            "工作源码",
            "lesson13.cpp"
          ],
          [
            "初始条件",
            "按原main初始化"
          ],
          [
            "观察目标",
            "理解公开继承"
          ]
        ],
        "先阅读自己的原始代码，区分声明与实际运行。",
        []
      ],
      [
        "执行与追踪",
        [
          [
            "本课任务",
            "保留Character、Warrior、Mage与powerAttack/castSpell接口。"
          ],
          [
            "调用顺序",
            "以main中的语句为准"
          ],
          [
            "数据变化",
            "逐步运行并查看变量"
          ]
        ],
        "图解为辅助教学；完整数值和调用步骤见前面的详细讲义。",
        []
      ],
      [
        "核对结果",
        [
          [
            "预期输出",
            "Health: 40；Health: 10；Mage mana: 60"
          ],
          [
            "参考目录",
            "reference/"
          ],
          [
            "自查",
            "两轮后检查Arthur生命40、Merlin生命10、Mage mana为60。"
          ]
        ],
        "将VS Code实际结果与预期对照，保留自己的代码风格。",
        []
      ]
    ]
  }
};

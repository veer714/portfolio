export const skillsData = {
  categories: [
    {
      id: "languages",
      title: "Programming Languages",
      icon: "Code2",
      description: "Core languages used for systems engineering, scientific computing, and application development.",
      skills: [
        { name: "Python", level: "Primary", tag: "AI/ML & Backend", note: "Primary language for data science, neural networks, scripting, and backend pipelines." },
        { name: "Java", level: "Core", tag: "OOP & Systems", note: "Object-oriented programming, data structures, and enterprise architecture fundamentals." },
        { name: "JavaScript", level: "Active", tag: "Frontend & Fullstack", note: "ES6+, asynchronous event handling, DOM manipulation, and modern web application logic." },
        { name: "C", level: "Academic", tag: "Low-level", note: "Memory management, pointers, and foundational computer science fundamentals." },
        { name: "C++", level: "Academic", tag: "Systems & DSA", note: "Standard Template Library (STL), algorithms, and performance-oriented programming." }
      ]
    },
    {
      id: "ai_ml",
      title: "Data & Machine Learning",
      icon: "Cpu",
      description: "Mathematical computing libraries, deep learning architectures, and statistical evaluation tools.",
      skills: [
        { name: "Machine Learning", level: "Core", tag: "Supervised & Unsupervised", note: "Classification, regression, clustering, model evaluation, and validation metrics." },
        { name: "Computer Vision", level: "Core", tag: "Deep Learning (CNN)", note: "Convolutional architectures, spatial feature extraction, image classification on CIFAR-10." },
        { name: "Data Science & Analysis", level: "Core", tag: "Exploratory Analysis", note: "Data wrangling, feature engineering, hypothesis verification, and statistical distributions." },
        { name: "NumPy", level: "Proficient", tag: "Scientific Computing", note: "N-dimensional array manipulations, vectorized matrix operations, and linear algebra." },
        { name: "Pandas", level: "Proficient", tag: "Data Manipulation", note: "DataFrames, time-series, cleaning missing values, aggregation, and grouping." },
        { name: "Scikit-learn", level: "Proficient", tag: "Modeling", note: "Model pipelines, feature scaling, cross-validation, Random Forests, SVM, Logistic Regression." },
        { name: "Matplotlib", level: "Proficient", tag: "Visualization", note: "Loss curves, confusion matrices, multi-panel technical plots, and telemetry visuals." },
        { name: "Seaborn", level: "Proficient", tag: "Statistical Graphics", note: "Pairplots, correlation heatmaps, violin plots, and density estimations." }
      ]
    },
    {
      id: "development",
      title: "Web & Backend Development",
      icon: "Layers",
      description: "Modern frameworks, client state management, and service integration.",
      skills: [
        { name: "React", level: "Proficient", tag: "Frontend UI", note: "Component architecture, hooks, state lifecycle, modular UI design, and responsive layouts." },
        { name: "REST APIs", level: "Proficient", tag: "Services", note: "HTTP contract design, JSON serialization, endpoint monitoring, and status observation." },
        { name: "FastAPI", level: "Familiar", tag: "Modern Python API", note: "High-performance asynchronous Python API design with Pydantic validation." },
        { name: "HTML5 & CSS3", level: "Proficient", tag: "Markup & Styling", note: "Semantic structure, responsive Flexbox/Grid, and modern CSS variables." },
        { name: "Tailwind CSS", level: "Proficient", tag: "Utility Styling", note: "Design systems, dark mode palettes, token-based layouts, and responsive utilities." }
      ]
    },
    {
      id: "tools",
      title: "Developer Tooling & Workflows",
      icon: "Terminal",
      description: "Version control, deployment pipelines, development environments, and automation.",
      skills: [
        { name: "Git", level: "Proficient", tag: "Version Control", note: "Branching, merging, commit discipline, rebasing, and repository management." },
        { name: "GitHub", level: "Proficient", tag: "Collaboration", note: "Open source contributions, issues, PR workflows, and automated deployments." },
        { name: "VS Code", level: "Daily Driver", tag: "IDE", note: "Integrated terminal, debugging, extensions, and configuration environments." },
        { name: "Vercel & Azure", level: "Deployment", tag: "Cloud Hosting", note: "Continuous deployment of frontend SPAs and cloud services (API Sentinel deployment)." }
      ]
    }
  ]
};


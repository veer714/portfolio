export const projectsData = [
  {
    id: "api-sentinel",
    file: "api-sentinel.tsx",
    title: "API Sentinel",
    tagline: "API Monitoring & Security Observability System",
    category: "Full Stack & Security",
    status: "Live & Deployed",
    github: "https://github.com/MindOverFloww/Sentinel-API",
    liveDemo: "https://apisentinel-azure.vercel.app/",
    overview: "A specialized API monitoring and security-focused project engineered to detect endpoint anomalies, verify contract status, and monitor request health across distributed services in real-time.",
    problem: "Modern cloud and client architectures communicate through dozens of distributed HTTP endpoints. When an external service changes contracts, degrades in latency, or returns silent 5xx status codes, downstream clients fail silently without actionable alerts.",
    approach: "Designed a centralized sentinel dashboard and probe worker that continuously pings designated endpoints, measures roundtrip latency distributions, verifies payload schema validity, and flags anomalous error rates before critical user sessions are impacted.",
    myContribution: [
      "Designed and developed the frontend dashboard interface for real-time endpoint observability.",
      "Integrated health-check probing mechanics and status response validation.",
      "Configured automated deployment workflows targeting Vercel and Azure cloud environments.",
      "Implemented latency histogram visualizers and status indicator feeds."
    ],
    techStack: [
      "React",
      "JavaScript",
      "Node.js",
      "REST APIs",
      "Tailwind CSS",
      "Vercel",
      "Azure"
    ],
    architecture: [
      { step: "01", name: "Probe Scheduler", desc: "Periodic health request dispatcher testing target endpoints" },
      { step: "02", name: "Payload Verifier", desc: "HTTP status code validation, response header inspection, latency telemetry" },
      { step: "03", name: "Security Check", desc: "Token presence, CORS enforcement, and security header auditing" },
      { step: "04", name: "Telemetry Feed", desc: "Real-time UI status distribution with active degradation warnings" }
    ],
    codeSnippet: `// Sentinel-API probe runner
async function evaluateEndpointHealth(targetEndpoint) {
  const startTime = performance.now();
  try {
    const response = await fetch(targetEndpoint.url, {
      method: targetEndpoint.method || 'GET',
      headers: targetEndpoint.headers,
      signal: AbortSignal.timeout(targetEndpoint.timeoutMs || 5000)
    });
    
    const latency = Math.round(performance.now() - startTime);
    const isHealthy = response.status >= 200 && response.status < 400;
    
    return {
      endpointId: targetEndpoint.id,
      status: response.status,
      latencyMs: latency,
      healthy: isHealthy,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      endpointId: targetEndpoint.id,
      status: 0,
      error: error.message,
      healthy: false,
      timestamp: new Date().toISOString()
    };
  }
}`
  },
  {
    id: "image-recognition",
    file: "image-recognition.py",
    title: "CIFAR-10 Image Recognition",
    tagline: "Deep Convolutional Neural Network for Computer Vision",
    category: "Machine Learning / Computer Vision",
    status: "Research & Modeling",
    github: "https://github.com/veer714/CIFAR_10",
    liveDemo: null,
    overview: "A computer vision model leveraging deep Convolutional Neural Networks (CNN) to categorize complex 32x32 color images across 10 distinct classes in the CIFAR-10 dataset.",
    problem: "Low-resolution 32x32 multi-spectral RGB images contain significant visual noise, partial occlusions, and high intra-class variance (e.g. distinguishing dogs vs cats or airplanes vs birds). Standard feedforward networks fail to retain spatial hierarchical features.",
    approach: "Engineered a modular Convolutional Neural Network architecture incorporating multi-stage feature extraction: stacked Conv2D layers with Batch Normalization to stabilize internal covariate shift, LeakyReLU/ReLU non-linearities, Max Pooling for spatial invariance, and Dropout layers to mitigate overfitting.",
    myContribution: [
      "Preprocessed and normalized the CIFAR-10 dataset into channel-wise scaled tensors.",
      "Designed and implemented the custom CNN layers using Python and deep learning frameworks.",
      "Conducted hyperparameter tuning across learning rate schedules, batch sizes, and filter depths.",
      "Generated confusion matrices, loss curves, and feature map visualizations using Matplotlib."
    ],
    techStack: [
      "Python",
      "TensorFlow / Keras",
      "NumPy",
      "Matplotlib",
      "OpenCV",
      "CNN Architecture",
      "Data Augmentation"
    ],
    architecture: [
      { step: "01", name: "Input Tensor", desc: "32x32x3 normalized RGB pixel tensors with random horizontal flip augmentation" },
      { step: "02", name: "Conv Block 1 & 2", desc: "32 & 64 filters (3x3 kernel) with BatchNormalization + ReLU" },
      { step: "03", name: "Spatial Reduction", desc: "2x2 MaxPooling followed by 25% spatial Dropout regularization" },
      { step: "04", name: "Dense Classifier", desc: "Flattened feature vector passed through Dense 512 + Softmax 10 classes" }
    ],
    codeSnippet: `# CIFAR-10 CNN Model Architecture Definition
import tensorflow as tf
from tensorflow.keras import layers, models

def build_cifar10_cnn(input_shape=(32, 32, 3), num_classes=10):
    model = models.Sequential([
        # Block 1
        layers.Conv2D(32, (3, 3), padding='same', activation='relu', input_shape=input_shape),
        layers.BatchNormalization(),
        layers.Conv2D(32, (3, 3), padding='same', activation='relu'),
        layers.MaxPooling2D(pool_size=(2, 2)),
        layers.Dropout(0.25),
        
        # Block 2
        layers.Conv2D(64, (3, 3), padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.Conv2D(64, (3, 3), padding='same', activation='relu'),
        layers.MaxPooling2D(pool_size=(2, 2)),
        layers.Dropout(0.25),
        
        # Classification Head
        layers.Flatten(),
        layers.Dense(512, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    return model`
  },
  {
    id: "heart-disease-ml",
    file: "heart-disease-ml.py",
    title: "Heart Disease Diagnostic ML",
    tagline: "Supervised Clinical Predictive Modeling & Risk Stratification",
    category: "Machine Learning / Healthcare Data",
    status: "Exploration & Evaluation",
    github: "https://github.com/veer714/",
    liveDemo: null,
    overview: "A biomedical predictive machine learning pipeline designed to analyze patient clinical indicators (cholesterol, resting blood pressure, electrocardiogram results, maximum heart rate) to assess cardiovascular risk probability.",
    problem: "Early detection of cardiovascular disease relies on multi-dimensional clinical measurements that often have non-linear correlations difficult to discern without systematic data modeling.",
    approach: "Executed an end-to-end data science pipeline: missing value imputation, outlier detection, MinMax/Standard scaling, exploratory data analysis via correlation heatmaps, and comparative model evaluation across Logistic Regression, Support Vector Machines, and Random Forest.",
    myContribution: [
      "Conducted exploratory data analysis (EDA) using Pandas, Matplotlib, and Seaborn.",
      "Engineered feature normalization pipelines and correlation matrix heatmaps.",
      "Implemented training, cross-validation, and ROC-AUC curve evaluation.",
      "Documented model interpretability and feature importance analysis."
    ],
    techStack: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn"
    ],
    architecture: [
      { step: "01", name: "Clinical Ingestion", desc: "Biomarker data (age, sex, chest pain, bp, chol, fbs, thal)" },
      { step: "02", name: "Preprocessing", desc: "Z-score scaling, one-hot encoding for categorical factors" },
      { step: "03", name: "Model Cross-Validation", desc: "K-Fold stratified evaluation across candidate classifiers" },
      { step: "04", name: "Risk Output", desc: "Calibrated probability distribution score for clinical review" }
    ],
    codeSnippet: `# Model Comparison Pipeline
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression

def evaluate_models(X, y):
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y, test_size=0.2, random_state=42, stratify=y
    )
    
    models = {
        "LogisticRegression": LogisticRegression(max_iter=1000),
        "RandomForest": RandomForestClassifier(n_estimators=100, random_state=42)
    }
    
    results = {}
    for name, clf in models.items():
        scores = cross_val_score(clf, X_train, y_train, cv=5, scoring='accuracy')
        clf.fit(X_train, y_train)
        results[name] = {
            "cv_mean": scores.mean(),
            "cv_std": scores.std(),
            "test_score": clf.score(X_test, y_test)
        }
    return results`
  },
  {
    id: "bladex-engine",
    file: "bladex-engine.ts",
    title: "BladeX Engine",
    tagline: "Developer Tooling & Script Execution Workspace",
    category: "Software Engineering & Tools",
    status: "Open Source Utility",
    github: "https://github.com/veer714/bladex",
    liveDemo: null,
    overview: "A lightweight developer script execution utility and experimentation repository exploring high-efficiency code execution patterns and task automation.",
    problem: "Repetitive developer maintenance and build workflow commands often lack a unified, minimalist wrapper for rapid local invocation.",
    approach: "Constructed modular task runners and structured configuration parsers enabling rapid command prototyping and clean pipeline automation.",
    myContribution: [
      "Authored clean modular JavaScript / TypeScript execution modules.",
      "Integrated command line arguments parsing and error capture handlers.",
      "Created structured documentation and repository workflow standards."
    ],
    techStack: [
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Git",
      "Automation"
    ],
    architecture: [
      { step: "01", name: "CLI Parser", desc: "Arguments and command flags dispatcher" },
      { step: "02", name: "Execution Core", desc: "Subprocess pipeline and async lifecycle manager" },
      { step: "03", name: "Telemetry Output", desc: "Streamed formatted standard output and diagnostic logs" }
    ],
    codeSnippet: `// BladeX task execution wrapper
export class TaskRunner {
  private tasks = new Map<string, () => Promise<void>>();

  register(name: string, action: () => Promise<void>) {
    this.tasks.set(name, action);
  }

  async run(taskName: string): Promise<boolean> {
    const task = this.tasks.get(taskName);
    if (!task) {
      console.error(\`Task "\${taskName}" not found.\`);
      return false;
    }
    console.log(\`[BladeX] Starting task: \${taskName}...\`);
    await task();
    console.log(\`[BladeX] Task completed successfully.\`);
    return true;
  }
}`
  }
];


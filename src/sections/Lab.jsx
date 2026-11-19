import React, { useState } from 'react';
import { 
  Brain, 
  Cpu, 
  Play, 
  RotateCcw, 
  Sliders, 
  Eye, 
  Layers, 
  CheckCircle2, 
  Zap,
  Sparkles
} from 'lucide-react';

export function Lab() {
  const classes = [
    { id: 'airplane', name: 'Airplane', icon: '✈️', color: '#60A5FA', topFeat: 'High-altitude horizontal wings' },
    { id: 'automobile', name: 'Automobile', icon: '🚗', color: '#3DD68C', topFeat: 'Chassis edges & wheel contours' },
    { id: 'bird', name: 'Bird', icon: '🐦', color: '#FBBF24', topFeat: 'Beak geometry & feather gradient' },
    { id: 'cat', name: 'Cat', icon: '🐱', color: '#F472B6', topFeat: 'Ear vertices & whisker textures' },
    { id: 'deer', name: 'Deer', icon: '🦌', color: '#A78BFA', topFeat: 'Antler bifurcation & leg symmetry' },
    { id: 'dog', name: 'Dog', icon: '🐶', color: '#FB923C', topFeat: 'Muzzle structure & ear curvature' },
    { id: 'frog', name: 'Frog', icon: '🐸', color: '#34D399', topFeat: 'Bulbous optic nodes & texture' },
    { id: 'horse', name: 'Horse', icon: '🐴', color: '#E879F9', topFeat: 'Torso proportion & hooves' },
    { id: 'ship', name: 'Ship', icon: '🚢', color: '#38BDF8', topFeat: 'Hull waterline & horizontal wake' },
    { id: 'truck', name: 'Truck', icon: '🚚', color: '#F87171', topFeat: 'Cuboid cargo box & dual axles' }
  ];

  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [activeFilter, setActiveFilter] = useState('horizontal_edge');
  const [learningRate, setLearningRate] = useState(0.001);
  const [dropoutRate, setDropoutRate] = useState(0.25);
  const [isInferring, setIsInferring] = useState(false);

  const filters = [
    { id: 'horizontal_edge', name: 'Sobel-H (Edges)', kernel: [[-1, -2, -1], [0, 0, 0], [1, 2, 1]] },
    { id: 'vertical_edge', name: 'Sobel-V (Edges)', kernel: [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]] },
    { id: 'laplacian', name: 'Laplacian (Contours)', kernel: [[0, 1, 0], [1, -4, 1], [0, 1, 0]] },
    { id: 'sharpen', name: 'High-Pass (Sharpen)', kernel: [[0, -1, 0], [-1, 5, -1], [0, -1, 0]] }
  ];

  const runInference = () => {
    setIsInferring(true);
    setTimeout(() => {
      setIsInferring(false);
    }, 600);
  };

  // Generate simulated activation matrix
  const getMatrixCells = () => {
    const cells = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const val = Math.sin((r * 3 + c * 2 + selectedClass.id.length) / 2) * 0.5 + 0.5;
        cells.push(val);
      }
    }
    return cells;
  };

  const matrixCells = getMatrixCells();

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-8 space-y-8 font-sans">
      {/* Scope Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[11px] text-[#5E6964] border-b border-[#292F2D] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#3DD68C]">// start .scope-lab</span>
          <span>PATH: src/lab/neural-playground.tsx</span>
        </div>
        <div className="flex items-center gap-2 text-[#3DD68C]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3DD68C] animate-pulse" />
          <span>INFERENCE_ENGINE: ACTIVE</span>
        </div>
      </div>

      {/* Lab Intro */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#181D1B] border border-[#292F2D] text-xs font-mono text-[#3DD68C]">
          <Brain size={14} />
          <span>Interactive Computer Vision Sandbox</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#E7ECE9] tracking-tight">
          CNN Feature Extraction &amp; Activation Lab
        </h2>
        <p className="text-sm text-[#929D97] max-w-3xl leading-relaxed">
          Interactive simulation modeled on my <strong>CIFAR-10 Convolutional Neural Network</strong> project. Select an input class, apply spatial convolutional kernels, and inspect the feature activation maps and softmax class logits.
        </p>
      </div>

      {/* Class Selector Bar */}
      <div className="space-y-2">
        <div className="text-xs font-mono text-[#5E6964] uppercase tracking-wider">
          Step 1: Select Input Class (CIFAR-10)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
          {classes.map((cls) => {
            const isSelected = cls.id === selectedClass.id;
            return (
              <button
                key={cls.id}
                onClick={() => {
                  setSelectedClass(cls);
                  runInference();
                }}
                className={`p-2 rounded flex flex-col items-center justify-center gap-1 border transition-all text-xs font-mono ${
                  isSelected
                    ? 'bg-[#181D1B] border-[#3DD68C] text-[#E7ECE9] shadow-sm shadow-[#3DD68C]/20'
                    : 'bg-[#141918] border-[#292F2D] text-[#929D97] hover:border-[#38423F]'
                }`}
              >
                <span className="text-xl">{cls.icon}</span>
                <span className="text-[10px] truncate max-w-full">{cls.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input Tensor & Feature Map Viewer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-lg bg-[#141918] border border-[#292F2D] space-y-4">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[#E7ECE9] font-bold flex items-center gap-2">
                <Layers size={14} className="text-[#3DD68C]" />
                <span>Conv2D Layer Activations</span>
              </span>
              <span className="text-[11px] text-[#5E6964]">Kernel: 3x3 // Stride: 1</span>
            </div>

            {/* Kernel Selector */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setActiveFilter(f.id);
                    runInference();
                  }}
                  className={`px-2.5 py-1 rounded border transition-colors ${
                    activeFilter === f.id
                      ? 'bg-[#3DD68C] text-[#0C0F0E] font-semibold border-[#3DD68C]'
                      : 'bg-[#0C0F0E] text-[#929D97] hover:text-[#E7ECE9] border-[#292F2D]'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>

            {/* Visual Activation Matrix */}
            <div className="bg-[#0C0F0E] p-4 rounded border border-[#292F2D] flex flex-col sm:flex-row items-center gap-6 justify-center">
              {/* Input Class Representation */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-24 h-24 rounded border border-[#292F2D] flex items-center justify-center text-4xl bg-[#141918] relative overflow-hidden">
                  <span>{selectedClass.icon}</span>
                  {isInferring && (
                    <div className="absolute inset-0 bg-[#3DD68C]/20 animate-pulse flex items-center justify-center text-[10px] font-mono text-[#3DD68C]">
                      SCANNING
                    </div>
                  )}
                </div>
                <span className="font-mono text-[10px] text-[#5E6964]">Input: 32x32x3</span>
              </div>

              {/* Arrow */}
              <div className="text-[#5E6964] font-mono text-xs hidden sm:block">
                ➔ Conv2D ➔
              </div>

              {/* Activation Heatmap (8x8 simulated feature response) */}
              <div className="flex flex-col items-center gap-2">
                <div className="grid grid-cols-8 gap-0.5 p-1 rounded bg-[#181D1B] border border-[#292F2D]">
                  {matrixCells.map((val, idx) => (
                    <div
                      key={idx}
                      className="w-3.5 h-3.5 rounded-xs transition-colors duration-300"
                      style={{
                        backgroundColor: `rgba(61, 214, 140, ${Math.max(0.1, val)})`
                      }}
                      title={`Activation: ${val.toFixed(2)}`}
                    />
                  ))}
                </div>
                <span className="font-mono text-[10px] text-[#3DD68C]">Feature Map Response</span>
              </div>
            </div>

            <div className="p-3 bg-[#0C0F0E] rounded border border-[#292F2D] text-xs font-mono text-[#929D97] space-y-1">
              <div className="text-[#E7ECE9] font-medium flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#3DD68C]" />
                <span>Salient Feature Detected:</span>
              </div>
              <p className="text-[#3DD68C] text-[11px]">{selectedClass.topFeat}</p>
            </div>
          </div>
        </div>

        {/* Right: Softmax Class Probability Logits */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-lg bg-[#141918] border border-[#292F2D] space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#292F2D] pb-2">
              <span className="text-[#E7ECE9] font-bold">Softmax Logits Distribution</span>
              <span className="text-[10px] text-[#3DD68C]">Sum = 1.00</span>
            </div>

            <div className="space-y-2 pt-1">
              {classes.map((cls) => {
                const isTarget = cls.id === selectedClass.id;
                const probability = isTarget ? 0.88 : (0.12 / 9);

                return (
                  <div key={cls.id} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className={isTarget ? 'text-[#3DD68C] font-bold' : 'text-[#929D97]'}>
                        {cls.icon} {cls.name}
                      </span>
                      <span className={isTarget ? 'text-[#3DD68C] font-bold' : 'text-[#5E6964]'}>
                        {(probability * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#0C0F0E] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isTarget ? 'bg-[#3DD68C]' : 'bg-[#292F2D]'
                        }`}
                        style={{ width: `${probability * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#292F2D] flex items-center justify-between text-[11px]">
              <span className="text-[#5E6964]">Predicted Class:</span>
              <span className="text-[#3DD68C] font-bold">{selectedClass.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="font-mono text-[11px] text-[#5E6964] text-center pt-4">
        // EOF .scope-lab — Veer Pratap Neural Vision Simulation
      </div>
    </div>
  );
}


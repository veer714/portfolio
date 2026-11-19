import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  GraduationCap, 
  Award, 
  BookOpen, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ExternalLink,
  Printer
} from 'lucide-react';
import { profileData } from '../data/profile';
import { skillsData } from '../data/skills';

export function Resume() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    // Generate text/markdown resume and trigger file download
    const resumeText = `# ${profileData.name}
Role: ${profileData.role}
Email: ${profileData.contact.email}
GitHub: ${profileData.contact.github}
LinkedIn: ${profileData.contact.linkedin}

## EDUCATION
Degree: ${profileData.education.degree}
Institution: ${profileData.education.institution}, ${profileData.education.location}
Status: ${profileData.education.status}

## TECHNICAL COMPETENCIES
- Languages: Python, Java, JavaScript, C, C++
- Data & Machine Learning: Machine Learning, Computer Vision (CNN), NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn
- Web & Development: React, REST APIs, FastAPI, Tailwind CSS, Git, GitHub

## FEATURED PROJECTS
1. API Sentinel: API monitoring & security observability system (React, Node.js, Vercel, Azure)
2. CIFAR-10 Image Recognition: Multi-class Computer Vision CNN Architecture (Python, TensorFlow, NumPy)
3. Heart Disease Diagnostic ML: Supervised clinical risk modeling (Python, Scikit-learn, Pandas)
4. BladeX Engine: Developer script execution utility (TypeScript, Node.js)
`;

    const blob = new Blob([resumeText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Veer_Pratap_Resume.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-8 space-y-8 font-sans">
      {/* Scope Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[11px] text-[#5E6964] border-b border-[#292F2D] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#3DD68C]">// start .scope-resume</span>
          <span>PATH: docs/resume.pdf</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#141918] hover:bg-[#181D1B] border border-[#292F2D] text-[#929D97] hover:text-[#E7ECE9] text-[11px] font-mono transition-colors"
          >
            <Printer size={12} />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#3DD68C] hover:bg-[#4ADE80] text-[#0C0F0E] font-semibold text-[11px] font-mono transition-all shadow-sm"
          >
            <Download size={12} />
            <span>{downloadSuccess ? 'Downloaded!' : 'Download Resume (.md)'}</span>
          </button>
        </div>
      </div>

      {/* Resume Document Paper Card */}
      <div className="bg-[#141918] border border-[#292F2D] rounded-lg p-6 sm:p-10 space-y-8 text-[#E7ECE9]">
        {/* Document Header */}
        <div className="border-b border-[#292F2D] pb-6 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#E7ECE9]">
                {profileData.name}
              </h1>
              <p className="text-sm font-mono text-[#3DD68C] mt-0.5">
                {profileData.role}
              </p>
            </div>
            <div className="text-xs font-mono text-[#929D97] sm:text-right space-y-1">
              <div>{profileData.contact.email}</div>
              <div>{profileData.contact.location}</div>
              <div className="text-[#3DD68C]">{profileData.contact.availability}</div>
            </div>
          </div>
        </div>

        {/* Section: Education */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#3DD68C] font-semibold tracking-wider uppercase">
            <GraduationCap size={15} />
            <span>Education</span>
          </div>

          <div className="bg-[#0C0F0E] p-4 rounded border border-[#292F2D] space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h3 className="text-sm font-bold text-[#E7ECE9]">
                {profileData.education.degree}
              </h3>
              <span className="text-xs font-mono text-[#5E6964]">
                {profileData.education.status}
              </span>
            </div>
            <div className="text-xs text-[#929D97] flex items-center gap-1.5 font-mono">
              <span className="text-[#E7ECE9]">{profileData.education.institution}</span>
              <span>•</span>
              <span>{profileData.education.location}</span>
            </div>
            
            <div className="pt-2">
              <div className="text-[11px] font-mono text-[#5E6964] mb-1.5">Key Academic Focus:</div>
              <div className="flex flex-wrap gap-1.5">
                {profileData.education.focus.map((item, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141918] text-[#929D97] border border-[#292F2D]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section: Technical Skill Set */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#3DD68C] font-semibold tracking-wider uppercase">
            <BookOpen size={15} />
            <span>Technical Capabilities</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-[#0C0F0E] p-4 rounded border border-[#292F2D] space-y-2">
              <div className="text-[#E7ECE9] font-bold">Languages &amp; Core</div>
              <div className="text-[#929D97] leading-relaxed">
                Python, Java, JavaScript, C, C++, HTML5, CSS3
              </div>
            </div>

            <div className="bg-[#0C0F0E] p-4 rounded border border-[#292F2D] space-y-2">
              <div className="text-[#E7ECE9] font-bold">Data &amp; Machine Learning</div>
              <div className="text-[#929D97] leading-relaxed">
                Machine Learning, Computer Vision (CNN), NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn
              </div>
            </div>

            <div className="bg-[#0C0F0E] p-4 rounded border border-[#292F2D] space-y-2">
              <div className="text-[#E7ECE9] font-bold">Web &amp; Cloud Development</div>
              <div className="text-[#929D97] leading-relaxed">
                React, REST APIs, FastAPI, Node.js, Tailwind CSS, Vercel, Azure
              </div>
            </div>

            <div className="bg-[#0C0F0E] p-4 rounded border border-[#292F2D] space-y-2">
              <div className="text-[#E7ECE9] font-bold">Developer Tooling</div>
              <div className="text-[#929D97] leading-relaxed">
                Git, GitHub, VS Code, Linux/Bash, Data Pipelines
              </div>
            </div>
          </div>
        </div>

        {/* Section: Academic & Engineering Projects */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#3DD68C] font-semibold tracking-wider uppercase">
            <Award size={15} />
            <span>Key Projects Summary</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Project 1 */}
            <div className="bg-[#0C0F0E] p-4 rounded border border-[#292F2D] space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="font-bold text-[#E7ECE9]">
                  API Sentinel — API Monitoring &amp; Observability
                </div>
                <span className="font-mono text-[10px] text-[#3DD68C]">Live Deployment</span>
              </div>
              <p className="text-[#929D97] leading-relaxed">
                Engineered proactive monitoring sentinel detecting endpoint latency anomalies, token validation status, and service health across cloud deployments.
              </p>
              <div className="font-mono text-[10px] text-[#5E6964]">
                Stack: React, Node.js, Express, REST APIs, Vercel, Azure
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-[#0C0F0E] p-4 rounded border border-[#292F2D] space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="font-bold text-[#E7ECE9]">
                  CIFAR-10 Image Recognition — Deep Convolutional Neural Network
                </div>
                <span className="font-mono text-[10px] text-[#60A5FA]">Computer Vision</span>
              </div>
              <p className="text-[#929D97] leading-relaxed">
                Architected multi-stage CNN featuring Conv2D, Batch Normalization, Max Pooling, and Dropout regularization for 10-class visual classification.
              </p>
              <div className="font-mono text-[10px] text-[#5E6964]">
                Stack: Python, TensorFlow, Keras, NumPy, Matplotlib, OpenCV
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="font-mono text-[11px] text-[#5E6964] text-center pt-4">
        // EOF .scope-resume — Veer Pratap Academic &amp; Technical Profile
      </div>
    </div>
  );
}


import React from "react";

import {
  Users,
  BarChart3,
  Code,
  Globe,
  Eye,
  ShieldCheck,
} from "lucide-react";
const ourProcess = () => {
    const processItems = [
    {
      title: "Analytics",
      description:
        "We use strong data analysis to predict market changes and help you get the best return on your investment.",
      icon: BarChart3,
    },
    {
      title: "Programming",
      description:
        "We carefully build complex surveys and trackers, so they are easy for people to use on every platform.",
      icon: Code,
    },
    {
      title: "Diverse Insights",
      description:
        "We have a diverse variety of respondents who provide us with real and accurate opinions.",
      icon: Users,
    },
    {
      title: "Global Reach",
      description:
        "We maintain a dedicated global footprint, drawing perspectives from diverse international markets.",
      icon: Globe,
    },
    {
      title: "Mystery Shopping",
      description:
        "We check real customer experiences secretly to provide honest information on service quality.",
      icon: Eye,
    },
    {
      title: "Survey Audit",
      description:
        "We check surveys to make the data is accurate and high-quality, giving reliable and unbiased results.",
      icon: ShieldCheck,
    },
  ];
  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-cyan-400 mb-2">Our Process</h3>
      </div>

      {/* Process Grid - 3x2 layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-[#1a2849] border border-cyan-400/20 rounded-xl p-6 transition-all duration-300 hover:bg-[#1e3159] hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/10 hover:scale-105"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[#0f1c3f]" />
              </div>

              {/* Title */}
              <h4 className="text-lg font-bold text-white mb-3">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ourProcess;

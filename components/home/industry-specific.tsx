import React from "react";

const industrySpecific = () => {
  const industryServices = {
    b2b: [
      "Key Stakeholder & Expert Interviews",
      "Product/Service Feasibility & Needs Assessment",
      "Vendor Evaluation & Competitive Benchmarking",
      "Sales Channel Optimization & Partner Strategy",
      "Technology Adoption & Trend Forecasting",
    ],
    b2c: [
      "Consumer Segmentation & Persona Development",
      "Brand Perception & Health Tracking",
      "Customer Experience (CX) & Journey Mapping",
      "Multimedia & Concept Testing",
      "Product Concept & Packaging Testing",
    ],
    healthcare: [
      "Physician & KOL Interviews",
      "Patient Journey & Needs Assessment",
      "Regulatory Compliance & Data Security",
      "Clinical Trial Recruitment Support",
      "Pharma/Device Concept Testing",
    ],
  };
  return (
    <div>
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-cyan-400 mb-2">
          Industry-Specific Services
        </h3>
      </div>

      {/* Industry Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* B2B */}
        <div className="bg-[#1a2849] border border-cyan-400/20 rounded-xl p-8 hover:border-cyan-400/50 transition-all duration-300">
          <h4 className="text-2xl font-bold text-white mb-6 text-center">
            B2B
          </h4>
          <div className="space-y-3 sm:space-y-4">
            {industryServices.b2b.map((service, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center text-[#0f1c3f] font-bold text-sm">
                  {index + 1}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed pt-1">
                  {service}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* B2C */}
        <div className="bg-[#1a2849] border border-cyan-400/20 rounded-xl p-8 hover:border-cyan-400/50 transition-all duration-300">
          <h4 className="text-2xl font-bold text-white mb-6 text-center">
            B2C
          </h4>
          <div className="space-y-4">
            {industryServices.b2c.map((service, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center text-[#0f1c3f] font-bold text-sm">
                  {index + 1}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed pt-1">
                  {service}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Healthcare */}
        <div className="bg-[#1a2849] border border-cyan-400/20 rounded-xl p-8 hover:border-cyan-400/50 transition-all duration-300">
          <h4 className="text-2xl font-bold text-white mb-6 text-center">
            Healthcare
          </h4>
          <div className="space-y-4">
            {industryServices.healthcare.map((service, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center text-[#0f1c3f] font-bold text-sm">
                  {index + 1}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed pt-1">
                  {service}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default industrySpecific;

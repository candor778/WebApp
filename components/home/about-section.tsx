type BulletPointProps = {
  title: string;
  description: string;
};

export function BulletPoint({ title, description }: BulletPointProps) {
  return (
    <div className="flex items-start gap-3">
      {/* Bullet */}
      <span className="mt-1 text-cyan-400 text-lg font-bold">•</span>

      {/* Text */}
      <p className="text-white/90 leading-relaxed">
        <span className="text-cyan-400 font-semibold">{title}:</span>{" "}
        {description}
      </p>
    </div>
  );
}

export function BulletPointWhite({ title, description }: BulletPointProps) {
  return (
    <div className="flex items-start gap-3">
      {/* Bullet */}
      <span className="mt-1 text-white text-lg font-bold">•</span>

      {/* Text */}
      <p className="text-white/90 leading-relaxed">
        <span className="text-white font-semibold">{title}:</span> {description}
      </p>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about"  className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl mt-10 md:text-6xl font-bold text-gray-800 mb-2">
            About Candor Survey
          </h2>
          <p className="text-gray-800">Uncovering the Truth Behind Every Data Point</p>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          {/* Image */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://images.pexels.com/photos/5716032/pexels-photo-5716032.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Market Research Analysis"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Text */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              We are a trusted market research agency
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Candor Survey isn`&apos;`t just a research firm: we are your
              strategic partner in navigating complexity. We combine advanced
              data science with genuine human empathy to deliver unbiased,
              crystal-clear insights that empower your most critical business
              decisions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We are committed to delivering precise, data-driven insights that
              empower businesses to grow sustainably, innovate strategically,
              and lead with clarity in an increasingly complex and fast-evolving
              market environment.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-8 md:p-10 text-white shadow-xl">
            <h4 className="text-2xl font-bold mb-6">Our Mission</h4>
            <p className="mb-6 leading-relaxed">
              At Candor Survey, our mission is to move beyond mere reporting. We
              actively decode the silent language of the market by capturing
              genuine, unfiltered human voices, transforming them into precise
              strategies that ignite business growth.
            </p>
            <div className="space-y-3">
              <BulletPoint
                title="Decode the Silent Language"
                description="Transform raw data into clear, human-centered narratives."
              />

              <BulletPoint
                title="Ignite Growth"
                description="Provide insights that directly lead to new products and market entry success."
              />

              <BulletPoint
                title="Champion Ethics"
                description="Conduct all research with the highest standard of integrity."
              />
            </div>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl p-8 md:p-10 text-white shadow-xl">
            <h4 className="text-2xl font-bold mb-6">Our Vision</h4>
            <p className="leading-relaxed">
              We aspire to be the force that reshapes industry standards. Our
              vision is to create a dynamic business environment where market
              leaders don`&apos;`t just react to change, but drive positive societal
              and commercial transformation through deep, ethical understanding.
            </p>
            <div className="space-y-3">
              <BulletPointWhite
                title="Reshape Industry Standards"
                description="Set the benchmark for insightful, reliable analysis globally."
              />

              <BulletPointWhite
                title="Drive Transformation"
                description="Empower businesses to create products that genuinely improve lives."
              />

              <BulletPointWhite
                title="Be the Future Predictor"
                description="Utilize advanced analytics to foresee market shifts."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

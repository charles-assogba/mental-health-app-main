import { Button } from "@/components/ui/button";
import {
  Heart,
  Brain,
  Sparkles,
  ArrowRight,
  BotMessageSquare,
  //Users,
  //Bell,
  //MessageSquareText,
  //ClipboardPenLine,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  sectionVariants,
  heroTextContainerVariants,
  fadeUp,
  pulseVariant,
  buttonHoverTap,
  //avatarContainerVariant,
  //avatarVariant,
  fadeRight,
  floatAnimation,
  featuresGridVariants,
  featureCardVariant,
  vibrantAccent,
  vibrantAccentBgLight,
  vibrantHighlight,
  vibrantHighlightBgLight,
  vibrantPrimary,
  vibrantPrimaryBg,
  vibrantPrimaryBgLight,
} from "./Home.data";

const HomeView = () => {
  return (
    <motion.div className="overflow-x-hidden">
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="flex justify-center w-full py-16 md:py-20 lg:py-28 bg-gradient-to-br from-teal-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30"
      >
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_450px] lg:gap-16 xl:grid-cols-[1fr_550px]">
            <motion.div
              variants={heroTextContainerVariants}
              className="flex flex-col justify-center space-y-6"
            >
              <motion.div
                variants={fadeUp}
                className={`inline-flex items-center self-start rounded-full ${vibrantHighlightBgLight} px-4 py-1.5 text-sm ${vibrantHighlight} font-medium shadow-sm`}
              >
                <motion.div animate={pulseVariant.animate}>
                  <Sparkles className={`mr-2 h-4 w-4 ${vibrantHighlight}`} />
                </motion.div>
                <span>Mental care</span>
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  variants={fadeUp}
                  className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-blue-600 to-blue-700 dark:from-teal-400 dark:via-purple-400 dark:to-teal-500"
                >
                  Upload your X-Ray picture and get the analysis result now
                </motion.h1>
                <motion.p
                  variants={fadeUp}
                  className="max-w-[650px] text-gray-600 dark:text-gray-300 md:text-xl lg:text-lg xl:text-xl leading-relaxed"
                >
                 Our app helps you analyse, study, and build medical knowledge.
                </motion.p>
              </div>

              <motion.div
                variants={fadeUp}
                className="flex flex-col gap-4 min-[400px]:flex-row"
              >
                <motion.div
                  whileHover={buttonHoverTap.hover}
                  whileTap={buttonHoverTap.tap}
                >
                  <Button
                    size="lg"
                    asChild
                    className={`group px-8 py-3 ${vibrantPrimaryBg} text-white font-semibold rounded-lg shadow-lg transition-all duration-300 ease-in-out`}
                  >
                    <Link
                      to="/register"
                      className="inline-flex items-center text-base"
                    >
                      Enroll now
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </Link>
                  </Button>
                </motion.div>
                {/* <motion.div
                  whileHover={buttonHoverTap.hover}
                  whileTap={buttonHoverTap.tap}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="group transition-colors duration-300 ease-in-out hover:bg-purple-100/60 dark:hover:bg-purple-900/40 hover:border-blue-300 dark:hover:border-purple-600 hover:text-blue-700 dark:hover:text-purple-300 border-gray-300 dark:border-gray-700 rounded-lg px-6 py-3"
                  >
                    <Link
                      to="/community"
                      className="inline-flex items-center text-base font-medium"
                    >
                      Explore Community
                      <Users
                        className={`ml-2 h-5 w-5 ${vibrantAccent} transition-transform duration-300 group-hover:scale-110`}
                      />
                    </Link>
                  </Button>
                </motion.div> */}
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex items-center space-x-4 pt-4"
              >
                {/*<motion.div
                  variants={avatarContainerVariant}
                  initial="hidden"
                  animate="visible"
                  className="flex -space-x-3"
                >
                  {[
                    "from-pink-400 to-purple-500",
                    "from-cyan-400 to-blue-500",
                    "from-green-400 to-teal-500",
                    "from-yellow-400 to-orange-500",
                  ].map((gradient, index) => (
                    <motion.div
                      key={index}
                      variants={avatarVariant}
                      whileHover="hover"
                      className={`relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-white ring-2 ring-background dark:ring-gray-800 shadow-md cursor-pointer`}
                      title={`User ${index + 1}`}
                    >
                      <span className="text-xs font-bold">
                        {["JD", "ST", "RK", "AL"][index]}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>*/}
                {/* <div className="text-sm text-gray-600 dark:text-gray-400">
                  Join{" "}
                  <span className={`font-semibold ${vibrantPrimary}`}>
                    10,000+
                  </span>{" "}
                  other users.
                </div> */}
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="visible"
              className="flex items-center row-start-1 lg:row-start-auto justify-center"
            >
              <motion.div
                animate={floatAnimation}
                className="relative w-full max-w-[380px] md:max-w-none md:h-[600px] md:w-[600px] rounded-3xl p-1.5 bg-gradient-to-br from-teal-300 via--300 to-teal-400 dark:from-teal-600 dark:via-purple-600 dark:to-teal-700 shadow-2xl shadow-purple-500/20 dark:shadow-purple-400/20"
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-background/80 dark:bg-gray-900/80 backdrop-blur-lg">
                  <img
                    src="/imageheader.jpg"
                    alt="Mental Health App Interface"
                    width={400}
                    height={500}
                    className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-105"
                    loading="eager"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="features"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex justify-center w-full py-16 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-950 -mt-10 z-10 relative"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center items-center space-y-3"
            >
              <div
                className={`inline-flex items-center rounded-lg ${vibrantAccentBgLight} px-4 py-1 text-sm font-medium ${vibrantAccent}`}
              >
                <Brain className="mr-1.5 h-5 w-5 flex-shrink-0" />
                <span>Featured Features</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
                Everything for Your Mental Well-being
              </h2>
              <p className="max-w-[800px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our comprehensive tools are designed to support your unique
                journey towards better mental health.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={featuresGridVariants}
            className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 py-6 md:py-8"
          >
            {[
              {
                icon: Heart,
                title: "Findings",
                text: "Evaluate the risks of the radiology",
                color: vibrantPrimary,
                lightBg: vibrantPrimaryBgLight,
              },
              {
                icon: Sparkles,
                title: "Probable treatment",
                text: "Access meditation library for stress, anxiety, sleep, etc.",
                color: vibrantAccent,
                lightBg: vibrantAccentBgLight,
              },
              {
                icon: BotMessageSquare,
                title: "Uploading image",
                text: "Interactive guidance to analyse the X-Ray image upload",
                color: vibrantHighlight,
                lightBg: vibrantHighlightBgLight,
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={featureCardVariant}
                whileHover="hover"
                className="group relative flex flex-col items-center space-y-4 rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/40 p-6 text-center shadow-sm transition-shadow duration-300 ease-in-out"
              >
                <div
                  className={`absolute mb-0 inset-0 rounded-xl ${feature.lightBg} opacity-0 transition-opacity duration-300 group-hover:opacity-30 -z-10`}
                ></div>

                <div
                  className={`rounded-full p-4 ${feature.lightBg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <feature.icon
                    className={`h-8 w-8 ${feature.color} transition-transform duration-300 group-hover:rotate-[-6deg]`}
                  />
                </div>
                <h3 className="text-xl font-semibold pt-1 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mt-12 md:mt-16"
          >
            <motion.div
              whileHover={buttonHoverTap.hover}
              whileTap={buttonHoverTap.tap}
            >
              <Button
                size="lg"
                asChild
                className={`group px-10 py-3 ${vibrantPrimaryBg} text-white font-semibold rounded-lg shadow-lg transition-opacity duration-300 ease-in-out`}
              >
                <Link
                  to="/register"
                  className="inline-flex items-center text-base"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default HomeView;

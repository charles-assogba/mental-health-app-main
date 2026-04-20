import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Brain,
  Sparkles,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  // Users,
  CalendarCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  fadeUp,
  sectionVariants,
  gridContainerVariants,
  cardHover,
  iconHover,
  // teamMemberHover,
  fadeLeft,
  timelineItemHover,
  timelineDotHover,
  fadeRight,
  buttonHoverTap,
  purpleBgLight,
  purpleColor,
  vibrantAccent,
  vibrantAccentBg,
  vibrantAccentBgLight,
  vibrantPrimary,
  vibrantPrimaryBg,
  vibrantPrimaryBgLight,
} from "./About.data";
import SectionHeader from "@/components/SectionHeader";

const AboutView: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-x-hidden"
    >
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="flex justify-center w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-teal-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30"
      >
        <div className="container px-4 md:px-6">
          <motion.div variants={fadeUp}>
            {" "}
            <SectionHeader
              icon={Heart}
              badgeText="Our Story"
              title="About Mental Health App"
              subtitle="We are committed to making mental well-being accessible to everyone, everywhere."
              iconColorClass={vibrantPrimary}
              badgeBgClass={vibrantPrimaryBgLight}
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="text-justify mx-auto max-w-3xl py-12"
          >
            <div className="prose px-6 md:px-0 prose-lg prose-gray dark:prose-invert max-w-none space-y-6 leading-relaxed text-gray-700 dark:text-gray-300">
              <p className="lead font-semibold text-xl text-gray-800 dark:text-gray-100">
                Mental Health App was founded in 2020 with a simple yet powerful
                vision: to create a world where everyone has the tools and support
                they need to care for their mental well-being.
              </p>
              <p>
                Our journey began when our founder, Sarah Chen, personally
                experienced the challenge of finding accessible mental health
                resources during a difficult time in her life. Recognizing that
                millions of people face similar barriers to accessing mental health
                services, she assembled a team of mental health professionals,
                technologists, and designers to create a solution.
              </p>
              <p>
                Today, Mental Health App serves over 10,000 users worldwide,
                providing evidence-based tools for mood tracking, meditation,
                cognitive behavioral therapy, and community support. We believe
                that mental health services should be accessible, personalized,
                and free from stigma.
              </p>
              <motion.blockquote
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="border-l-4 border-teal-500 dark:border-teal-400 pl-4 italic text-gray-600 dark:text-gray-400"
              >
                "Mental health is not an end goal, but rather a process. It's
                about how you walk the journey, not where you're going."
              </motion.blockquote>
              <p>
                Our app is designed with input from certified therapists,
                psychologists, and mental health researchers to ensure that every
                feature is based on science and best practices. We are committed
                to continuously improving the app based on user feedback and the
                latest research in mental health.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="flex justify-center w-full py-16 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-950 -mt-10 z-10 relative"
      >
        <div className="container px-4 md:px-6">
          <motion.div variants={fadeUp}>
            {" "}
            <SectionHeader
              icon={Brain}
              badgeText="Our Values"
              title="What We Believe"
              subtitle="Our core values guide everything we do at Mental Health App."
              iconColorClass={vibrantAccent}
              badgeBgClass={vibrantAccentBgLight}
            />
          </motion.div>

          <motion.div
            variants={gridContainerVariants}
            className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3"
          >
            {[
              {
                icon: Heart,
                title: "Compassion",
                text: "We approach mental health with empathy, understanding, and without judgment.",
                colorClass: vibrantPrimary,
                lightBg: vibrantPrimaryBgLight,
              },
              {
                icon: Sparkles,
                title: "Accessibility",
                text: "We believe mental health tools should be available to everyone, regardless of background or resources.",
                colorClass: vibrantAccent,
                lightBg: vibrantAccentBgLight,
              },
              {
                icon: Brain,
                title: "Evidence-Based",
                text: "Our approach is based on scientific research and proven therapeutic techniques.",
                colorClass: purpleColor,
                lightBg: purpleBgLight,
              },
            ].map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                whileHover="hover"
                custom={cardHover}
                className="group flex flex-col items-center space-y-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-8 shadow-sm transition-all duration-300 ease-in-out"
              >
                <motion.div
                  whileHover={iconHover.hover}
                  className={`rounded-full ${value.lightBg} p-4 transition-transform duration-300`}
                >
                  <value.icon
                    className={`h-8 w-8 ${value.colorClass} transition-colors duration-300`}
                  />
                </motion.div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="flex justify-center w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900/30"
      >
        <div className="container px-4 md:px-6">
          <motion.div variants={fadeUp}>
            <SectionHeader
              icon={Users}
              badgeText="Tim Kami"
              title="Mengenal Tim Kami"
              subtitle="Tim ahli kami yang beragam sangat bersemangat untuk mentransformasi layanan kesehatan mental."
              iconColorClass={purpleColor}
              badgeBgClass={purpleBgLight}
            />
          </motion.div>

          <motion.div
            variants={gridContainerVariants}
            className="mx-auto grid max-w-6xl grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                name: "Zahran Zaidan Nasution",
                title: "Frontend Backend",
                desc: "Web developer yang suka dengan mobil & otomotif.",
                img: "/placeholder-user-1.jpg",
              },
              {
                name: "Dr. Michael Rodriguez",
                title: "Chief Clinical Officer",
                desc: "Psikolog klinis, ahli CBT & mindfulness.",
                img: "/placeholder-user-2.jpg",
              },
              {
                name: "Aisha Patel",
                title: "Kepala Produk",
                desc: "Spesialis UX dengan latar belakang health tech.",
                img: "/placeholder-user-3.jpg",
              },
              {
                name: "James Wilson",
                title: "CTO",
                desc: "Software engineer ahli aplikasi kesehatan.",
                img: "/placeholder-user-4.jpg",
              },
              {
                name: "Dr. Elena Kim",
                title: "Research Director",
                desc: "Neuroscientist fokus pada teknologi & mental health.",
                img: "/placeholder-user-5.jpg",
              },
              {
                name: "David Okafor",
                title: "Community Manager",
                desc: "Advokat kesehatan mental & pembangun komunitas.",
                img: "/placeholder-user-6.jpg",
              },
            ].map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                whileHover="hover"
                custom={teamMemberHover}
                className="group flex flex-col items-center space-y-4 text-center p-6 rounded-lg transition-all duration-300 ease-in-out hover:bg-white/60 dark:hover:bg-gray-800/60 hover:shadow-md"
              >
                <div className="relative h-40 w-40 overflow-hidden rounded-full shadow-lg border-4 border-white dark:border-gray-700 group-hover:border-teal-300 dark:group-hover:border-teal-500 transition-colors duration-300">
                  <img
                    src={
                      member.img ||
                      `https://source.unsplash.com/160x160/?portrait,person&random=${member.name}`
                    }
                    alt={member.name}
                    className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className={`text-sm font-medium ${vibrantPrimary}`}>
                    {member.title}
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 px-2">
                    {member.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section> */}

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="flex justify-center w-full py-16 md:py-24 lg:py-32 bg-slate-100 dark:bg-gray-800 rounded-t-3xl -mt-10 z-10 relative"
      >
        <div className="container px-8 md:px-16">
          <div className="grid gap-16 md:grid-cols-2">
            <motion.div variants={fadeLeft} className="space-y-6">
              <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <CalendarCheck className="mr-2 h-4 w-4" />{" "}
                <span>Our Journey</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                Walking Together with You
              </h2>
              <p className="text-gray-600 dark:text-gray-300 md:text-lg">
                From a small startup to a global mental wellness platform.
              </p>

              <motion.div
                variants={gridContainerVariants}
                className="space-y-6 border-l-2 border-teal-500/50 dark:border-teal-400/50 pl-6"
              >
                {[
                  {
                    year: "2020",
                    title: "Founding",
                    desc: "Founded by Aran2876 after his personal struggles.",
                  },
                  {
                    year: "2021",
                    title: "Beta Launch",
                    desc: "Early release to 500 users, focusing on mood tracking & meditation.",
                  },
                  {
                    year: "2022",
                    title: "Public Launch",
                    desc: "Official launch with expanded features & community support.",
                  },
                  {
                    year: "2023",
                    title: "Research Partnership",
                    desc: "Partnering with universities for effectiveness studies.",
                  },
                  {
                    year: "2024",
                    title: "Global Expansion",
                    desc: "Reaching 10,000+ users in 30+ countries, multi-language support.",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.year}
                    variants={fadeUp}
                    whileHover="hover"
                    custom={timelineItemHover}
                    className="relative group pl-4 transition-all duration-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-md py-2"
                  >
                    <motion.div
                      whileHover="hover"
                      custom={timelineDotHover}
                      className={`absolute -left-[34px] top-3 h-4 w-4 rounded-full ${vibrantPrimaryBg} border-4 border-slate-100 dark:border-gray-800 transition-transform duration-300`}
                    ></motion.div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                      <span className={`font-bold ${vibrantPrimary}`}>
                        {item.year}:
                      </span>{" "}
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={fadeRight} className="space-y-8">
              <div className="space-y-4">
                <motion.div variants={fadeUp} className="space-y-4">
                  <div className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    <Mail className="mr-2 h-4 w-4" />{" "}
                    <span>Stay Connected</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                    Contact Us
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 md:text-lg">
                    Have questions or suggestions? We're here to listen.
                  </p>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="space-y-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 shadow-sm"
                >
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: "support@mentalhealthapp.com",
                      href: "mailto:support@mentalhealthapp.com",
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      value: "+1 (555) 123-4567",
                      href: "tel:+15551234567",
                    },
                    {
                      icon: MapPin,
                      label: "Office",
                      value: "123 Wellness St, San Francisco, CA",
                    },
                  ].map((contact) => (
                    <motion.div
                      key={contact.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-start gap-4 group"
                    >
                      <motion.div whileHover={iconHover.hover}>
                        <contact.icon
                          className={`h-5 w-5 mt-1 flex-shrink-0 ${vibrantPrimary} transition-transform duration-300`}
                        />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                          {contact.label}
                        </h3>
                        {contact.href ? (
                          <a
                            href={contact.href}
                            className={`text-sm text-gray-600 dark:text-gray-300 hover:underline ${vibrantPrimary}`}
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {contact.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  <motion.div className="pt-4" variants={fadeUp}>
                    {" "}
                    <Button
                      asChild
                      className={`w-full ${vibrantPrimaryBg} hover:opacity-90 text-white font-semibold transition-all duration-300 ease-in-out`}
                    >
                      <Link to="/contact">
                        {" "}
                        Send Message Now
                        <ArrowRight className="ml-2 h-4 w-4 animate-bounce-horizontal" />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                variants={fadeUp}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 shadow-sm"
              >
                <h3 className="mb-3 font-semibold text-lg text-gray-800 dark:text-gray-100">
                  Subscribe to Our Newsletter
                </h3>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  Get the latest mental wellness tips, research, and app features
                  delivered to your inbox.
                </p>
                <form className="flex flex-col sm:flex-row gap-2">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="newsletter-email"
                    placeholder="Enter your email"
                    type="email"
                    required
                    className="flex-grow h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 dark:focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-shadow duration-200 focus:shadow-outline-teal"
                  />
                  <motion.div
                    whileHover={buttonHoverTap.hover}
                    whileTap={buttonHoverTap.tap}
                    className="flex-shrink-0"
                  >
                    <Button
                      type="submit"
                      className={`${vibrantAccentBg} hover:opacity-90 text-white font-medium transition-opacity duration-200 px-5`}
                    >
                      Subscribe
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default AboutView;

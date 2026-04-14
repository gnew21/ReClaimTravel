import { motion } from "motion/react";
import { UserPlus, MessageSquare, Users, ShieldCheck, Activity } from "lucide-react";

const AGENTS = [
  {
    name: "Intake Agent",
    icon: UserPlus,
    description: "Processes seller submissions — parses booking confirmations, identifies providers, checks transfer policies, sets optimal resale pricing.",
    status: "Active",
    color: "bg-blue-500"
  },
  {
    name: "Provider Agent",
    icon: MessageSquare,
    description: "Communicates with hotels, airlines, and venues — initiating transfers, handling follow-ups, confirming name changes.",
    status: "Active",
    color: "bg-purple-500"
  },
  {
    name: "Matching Agent",
    icon: Users,
    description: "Connects available bookings to interested buyers. Handles discovery, questions, purchase flow, and post-transfer verification.",
    status: "Active",
    color: "bg-green-500"
  }
];

export default function AgentStatus() {
  return (
    <section id="agents" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Three agent layers, one seamless experience</h2>
          <p className="text-white/60 max-w-2xl mx-auto">Each AI agent handles a distinct part of the transaction lifecycle. Humans only step in when confidence is low or stakes are high.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AGENTS.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-8 bg-white/5 border border-white/10 rounded-2xl relative group hover:border-white/20 transition-all"
            >
              <div className={`w-12 h-12 ${agent.color}/20 rounded-xl flex items-center justify-center mb-6 text-white`}>
                <agent.icon className="w-6 h-6" />
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                  <Activity className="w-3 h-3" />
                  {agent.status}
                </div>
              </div>
              
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {agent.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Success Rate</span>
                  <span className="text-white font-medium">98.2%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "98.2%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full ${agent.color}`} 
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Value Threshold", desc: "Bookings over $500 get human review before transfer." },
            { title: "Dispute Handling", desc: "AI prepares case summaries for fast human resolution." },
            { title: "Provider Confidence", desc: "90%+ confidence required before listing goes live." },
            { title: "Fraud Detection", desc: "Pattern matching blocks scams before they reach buyers." }
          ].map((item) => (
            <div key={item.title} className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
              <p className="text-white/40 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

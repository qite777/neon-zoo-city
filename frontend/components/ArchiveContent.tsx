import { AnimatedSection, AnimatedCard } from "./AnimatedSection";

const skills = [
  { category: "研学设计", items: ["课程研发", "PBL 项目设计", "营前手册", "安全管理"] },
  { category: "项目管理", items: ["供应商尽调", "流程管理", "评估体系", "复盘沉淀"] },
  { category: "AIGC 创作", items: ["AI 短片", "视觉实验", "提示词工程", "内容生产"] },
  { category: "国际交流", items: ["英国夏校", "新加坡研学", "芬兰极光营", "港深项目"] },
];

const contacts = [
  { label: "邮箱", value: "1510760873@qq.com", href: "mailto:1510760873@qq.com" },
  { label: "城市主页", value: "neon-zoo-city.vercel.app", href: "/" },
];

export function ArchiveContent() {
  return (
    <div className="flex flex-col gap-10">
      {/* Profile card */}
      <AnimatedSection>
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
          <h3 className="text-2xl font-bold">个人资料</h3>
          <p className="mt-4 leading-relaxed text-[#8b8d9a]">
            Lilia，城市探索者，Neon Zoo City 的建造者。在国际教育、AIGC 创作与城市探索之间游走，
            持续把研学经验、创作实验与成长轨迹沉淀为数字档案。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["研学设计", "AIGC 创作", "项目管理", "国际交流", "乡村公益"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-[#8b8d9a]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Skills grid */}
      <AnimatedSection delay={100}>
        <h3 className="mb-6 text-2xl font-bold">技能与能力</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((skill, index) => (
            <AnimatedCard key={skill.category} delay={index * 100}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h4 className="font-bold text-[#39FF14]">{skill.category}</h4>
                <ul className="mt-3 space-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className="text-sm text-[#8b8d9a]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      {/* Contact */}
      <AnimatedSection delay={200}>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#39FF14]/10 via-transparent to-[#00F0FF]/10 p-8">
          <h3 className="text-2xl font-bold">联系方式</h3>
          <div className="mt-4 space-y-3">
            {contacts.map((contact) => (
              <div key={contact.label} className="flex items-center gap-3">
                <span className="text-sm text-[#8b8d9a]">{contact.label}</span>
                <a
                  href={contact.href}
                  className="text-sm text-white transition-colors hover:text-[#39FF14]"
                >
                  {contact.value}
                </a>
              </div>
            ))}
          </div>        </div>
      </AnimatedSection>
    </div>
  );
}

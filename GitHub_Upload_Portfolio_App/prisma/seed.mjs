import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function readMinutes(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const posts = [
  {
    slug: "how-to-define-your-icp-in-7-days",
    title: "How to Define Your ICP in 7 Days (Without Guessing)",
    excerpt:
      "Most founders target 'everyone' and reach no one. Here is a 7-day, research-led process to define an Ideal Customer Profile that actually sharpens your marketing.",
    category: "ICP Research",
    tags: "icp, positioning, strategy",
    coverImage: "/work/portfolio_icp.png",
    featured: true,
    content: `Most early-stage marketing fails for one boring reason: the business is trying to talk to everyone, so it ends up resonating with no one. Your Ideal Customer Profile (ICP) is the fix. Done right, it makes your messaging sharper, your ads cheaper, and your content easier to write.

Here is the 7-day process I use with clients.

## Day 1-2: Mine what you already have

Before any AI tool, look at reality:

- **Existing customers**: Who pays, stays, and refers? List your best 5-10.
- **Reviews**: Yours and competitors'. The exact words customers use are gold for messaging.
- **Sales calls / DMs**: What problem do people describe in their own language?

> The goal is not a persona with a stock photo and a fake name. It is the real buying context.

## Day 3-4: Find the patterns

Group what you found into three buckets:

1. **Pains** - what is broken in their world right now
2. **Triggers** - the event that makes them start looking
3. **Objections** - why they hesitate to buy

If you can fill these three for one customer type, you already have more clarity than 80% of competitors.

## Day 5: Scan the competition

Look at 3-5 competitors and answer:

- Who are they clearly talking to?
- What angle are they NOT covering?

That gap is often your opening.

## Day 6: Write the ICP statement

Use this template:

\`\`\`
We help [specific who]
who struggle with [specific pain]
achieve [specific outcome]
unlike [alternative] because [your difference].
\`\`\`

## Day 7: Pressure-test it

Show it to two real prospects. If they say "that is exactly me," you are done. If they shrug, tighten the "who."

**Bottom line:** A good ICP is not a document you file away. It is a filter for every marketing decision you make next.`,
  },
  {
    slug: "go-to-market-strategy-for-startups",
    title: "A Simple Go-To-Market Strategy for Startups (That You Will Actually Use)",
    excerpt:
      "Forget the 40-slide GTM deck. Here is a lean, one-page go-to-market framework that helps you launch, learn, and iterate fast.",
    category: "GTM",
    tags: "gtm, launch, startup",
    coverImage: "/work/portfolio_nudgeai.png",
    featured: true,
    content: `A go-to-market strategy does not need to be a 40-slide deck. For most startups, that deck becomes a graveyard: written once, never opened again. What you need is a one-page plan you can act on this week.

## The 5 questions a GTM must answer

1. **Who exactly are we selling to?** (Your ICP - be specific.)
2. **What problem are we solving, in their words?**
3. **What is our wedge offer?** The simplest first thing they can buy or try.
4. **Which channel will we win on first?** Pick one, not five.
5. **What does 'working' look like?** One metric for the next 30 days.

## Pick one channel, not five

The most common startup mistake is spreading thin across LinkedIn, ads, SEO, cold email, and events at once. You learn nothing from any of them.

Instead:

- Choose **one channel** where your ICP already pays attention.
- Run it for **30 days** with consistent effort.
- Measure one thing: qualified conversations.

## Build a wedge offer

Your full product or service can be intimidating. A wedge offer lowers the risk:

- A paid audit instead of a full retainer
- A starter package instead of an enterprise plan
- A free teardown that leads to a paid project

## Iterate weekly

Every Friday, answer three questions:

- What did we learn about the customer?
- What is working that we should double down on?
- What should we kill?

> GTM is not a launch event. It is a loop: target, message, channel, learn, adjust.

Keep it on one page. Revisit it weekly. That beats a beautiful deck every time.`,
  },
  {
    slug: "brand-positioning-mistakes-d2c",
    title: "5 Brand Positioning Mistakes That Make D2C Brands Invisible",
    excerpt:
      "If your D2C brand sounds like everyone else, customers cannot tell you apart, so they buy on price. Here are 5 positioning mistakes and how to fix them.",
    category: "Positioning",
    tags: "positioning, d2c, branding",
    coverImage: "/work/portfolio_glow.png",
    featured: false,
    content: `When a D2C brand cannot grow profitably, the problem is usually upstream of ads and creative. It is positioning. If customers cannot tell why you are different, they default to the one thing they can compare: price.

Here are five positioning mistakes I see again and again.

## 1. Describing features instead of outcomes

"100% natural ingredients" is a feature. "Skin that finally calms down in 2 weeks" is an outcome. Lead with the outcome; support it with the feature.

## 2. Talking to everyone

A brand "for all skin types, all ages, all genders" is a brand for no one in particular. Narrow your primary customer. You can always expand later.

## 3. Copying the category leader

If you sound like the market leader, you just remind people to buy from the market leader. Find the angle they are too big to own.

## 4. No clear enemy

Strong brands position against something: a bad old way, a frustrating status quo. What are you the antidote to?

## 5. Burying the positioning

Your positioning should hit in the first 3 seconds on your homepage and your profile. If a visitor has to scroll to understand what you do and for whom, it is buried.

## The fix: one sentence

Write this and put it everywhere:

\`\`\`
[Brand] helps [specific customer] [achieve outcome]
without [the usual pain].
\`\`\`

> Positioning is not a tagline contest. It is the decision about what you want to be known for, and what you are willing to ignore.

Get this right and everything downstream (ads, content, packaging) gets easier and cheaper.`,
  },
];

async function main() {
  console.log("Seeding database...");

  for (const p of posts) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        category: p.category,
        tags: p.tags,
        coverImage: p.coverImage,
        featured: p.featured,
        published: true,
        readMinutes: readMinutes(p.content),
      },
      create: {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        category: p.category,
        tags: p.tags,
        coverImage: p.coverImage,
        featured: p.featured,
        published: true,
        readMinutes: readMinutes(p.content),
      },
    });
    console.log("  [ok] " + p.slug);
  }

  const leadCount = await prisma.lead.count();
  if (leadCount === 0) {
    await prisma.lead.create({
      data: {
        name: "Sample Lead",
        email: "sample@example.com",
        business: "Example D2C Brand",
        need: "ICP & Buyer Persona Research",
        message: "This is a sample lead so you can see how the admin looks.",
        status: "new",
      },
    });
    console.log("  [ok] sample lead");
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/* =====================================================================
   Helthy HQ: dashboard data
   This file is the single source the dashboard reads. Plain JavaScript,
   no build step: edit, save, reopen the dashboard. Aaron (or his Claude)
   keeps it current. Dates are YYYY-MM-DD.
   ===================================================================== */
window.HELTHY_DATA = {
  /* Knowledge migrated out of Notion into Files/Knowledge Base/ on 2026-06-09. */

  /* Live backend: a dedicated Supabase project (PostgREST). When reachable, the
     Tasks tab reads/writes hq_tasks (the list below is the offline fallback and
     first-run seed), the Meetings tab reads/writes hq_meetings + hq_tabs, and the
     From Claude tab reads/writes hq_handoffs. The publishable key is anon-scoped
     to those hq_* tables only (safe to ship in this file; it cannot reach any
     other project). Schema: hq-supabase-schema.sql at the root of this folder. */
  supabase: {
    url: "https://xnfobhzhczzviuhivimo.supabase.co/rest/v1",
    key: "sb_publishable_xnjjsu1dnc8HOrFbHiMGig_XTwjP_bT",
  },

  timeline: { start: "2026-06-08", end: "2026-07-19" },

  tracks: [
    {
      name: "Engine room",
      bars: [
        { label: "New product database", start: "2026-06-08", end: "2026-06-11", progress: 100 },
        { label: "Connect the app to the new database", start: "2026-06-13", end: "2026-07-04", progress: 100 },
      ],
    },
    {
      name: "Smart recommendations",
      bars: [
        { label: "Similar-products engine v1", start: "2026-06-24", end: "2026-07-02", progress: 45 },
      ],
    },
    {
      name: "Scoring quality",
      bars: [
        { label: "Scoring accuracy tune-up", start: "2026-06-11", end: "2026-07-04", progress: 90 },
        { label: "Scoring engine v2 rebuild + tuning sliders", start: "2026-07-10", end: "2026-07-17", progress: 80 },
      ],
    },
    {
      name: "Mobile app",
      bars: [
        { label: "iOS and Android app shell", start: "2026-06-10", end: "2026-06-30", progress: 100 },
        { label: "Apple Developer enrollment", start: "2026-06-09", end: "2026-07-12", progress: 100 },
        { label: "Security and keys hardening", start: "2026-06-22", end: "2026-07-02", progress: 0 },
      ],
    },
    {
      name: "Beta",
      bars: [
        { label: "Accounts and anonymous usage insights", start: "2026-07-11", end: "2026-07-14", progress: 100 },
        { label: "Tester invites and feedback rounds", start: "2026-06-30", end: "2026-07-17", progress: 25 },
      ],
    },
  ],

  milestones: [
    { date: "2026-06-11", label: "New database live" },
    { date: "2026-06-23", label: "Blood-sugar safety check in" },
    { date: "2026-06-25", label: "Catalog re-scored on rebuilt nutrition (in testing)" },
    { date: "2026-06-28", label: "Rebuilt scores switched on; recommendations now use them" },
    { date: "2026-07-02", label: "Similar products working" },
    { date: "2026-07-06", label: "Database switchover complete; home picks hardened" },
    { date: "2026-07-07", label: "Database and recommendation work merged into the main app code" },
    { date: "2026-07-09", label: "App verified working on a real iPhone" },
    { date: "2026-07-09", label: "Scoring unified into one engine; extra safety check added" },
    { date: "2026-07-12", label: "TestFlight unblocked: Apple Developer account in place" },
    { date: "2026-07-12", label: "Accounts and anonymous usage insights built for the alpha" },
    { date: "2026-06-30", label: "Beta on phones (TestFlight)" },
    { date: "2026-07-17", label: "Go or grow: public launch call" },
    { date: "2026-07-18", label: "Sign in with Apple connected end to end" },
    { date: "2026-07-18", label: "First build uploaded to TestFlight (internal)" },
    { date: "2026-07-20", label: "Scoring update: dried fruit corrected, and a blank nutrition panel can no longer be rated well on its name" },
    { date: "2026-07-23", label: "Five scan-flow bugs fixed and confirmed on a real phone: the second scan back, the toast off the navigation bar, a text field that no longer zooms in, a barcode failure that now explains itself instead of freezing, and a card-collapse fix." },
    { date: "2026-07-25", label: "Those five scan-flow fixes merged into the main app code, along with an updated scoring engine, and shipped in a new TestFlight build" },
    { date: "2026-07-25", label: "Submitted to Apple for outside beta review, with a public join link ready to share once Apple approves it" },
    { date: "2026-08-04", label: "Testers can now disagree with a rating. A thumbs up and thumbs down sit under every score, and a thumbs down can carry a reason: too harsh, too generous, or wrong product. Written feedback also moved inside the app. Apple approved the build the same day, so this reached the outside beta group too, and testers get it without installing anything. The reactions save to our database. Nothing displays them yet. There are only four so far and two of those are Apple's reviewer, so the sensible order is to let real reactions build up first and then build somewhere to read them." },
  ],

  /* status: grown (done) · growing (in progress) · sprout (up next) · waiting (blocked on something) */
  tasks: [
    {
      title: "Design and test the new product database",
      note: "Rebuilt around real relationships between products, brands, categories, and nutrition. Verified end to end on real data.",
      owner: "Aaron", track: "Engine room", status: "grown",
    },
    {
      title: "Switch the new database on",
      note: "Done: the new database is built, filled, and running live alongside the current one. The app now reads from it: product details and scores on a scan, and now the recommendations too (both the picks row and the similar-products suggestions). Scores were double-checked across all 510,000 products. The switchover is now complete and fully rolled out: every read and write goes through the new database, and all the supporting services are running the updated code. We also hardened the home picks row so tapping into a pick always shows the product's real, current details instead of a cached snapshot.",
      owner: "Aaron", track: "Engine room", status: "grown",
    },
    {
      title: "Build similar-products recommendations v1",
      note: "The headline payoff of the new database: scan something, see better-scoring alternatives instantly. The suggestions now inherit the corrected scores, and the home picks row already runs on the new database and is fast and accurate. The remaining work is the full rebuild of the search and ranking so the whole catalog is considered.",
      owner: "Aaron", track: "Smart recommendations", status: "growing", due: "2026-07-02",
    },
    {
      title: "Tune the scoring rules",
      note: "We built a test set of real products plus automated quality checks for the scores, and used them to pinpoint exactly what to fix: a few foods score too harshly (plain milk), a few too kindly (sweetened instant oatmeal), and some are missing data. Good news from the checks: the old coconut water complaint is already resolved. The blood-sugar safety check is in and tested against real public nutrition data, and by design it can only ever make a score more cautious, never less. Big step this week: we rebuilt the nutrition behind the catalog from trusted public databases (Open Food Facts and USDA, covering about 99.97% of products) into a testing copy and re-scored every product with the new engine. The rebuilt scores check out as clearly safer overall: they tighten tens of thousands of products that were scored too kindly, and they also lift about five thousand everyday foods that were being marked avoid unfairly, like plain milk, yogurt, and canned vegetables. Where we do not have enough trusted data, a product is left as not enough data rather than guessed. We have now switched the app over to these rebuilt scores, so both the picks row and the similar-products suggestions draw from them. What is left is tuning the last edge cases (mainly some canned fruit in syrup and juices) before the beta. We also consolidated the scoring so the whole app now runs on a single scoring engine instead of a few separate copies that could drift apart, and added one more safety guard: if a product does not report its saturated fat, we now show it as not enough data rather than guessing it friendly.",
      owner: "Aaron", track: "Scoring quality", status: "growing", due: "2026-06-28",
    },
    {
      title: "Enroll in the Apple Developer Program",
      note: "Underway. Lisa secured the company's D-U-N-S number, the long-lead first step Apple uses to confirm the business is real. Next is finishing the Organization enrollment with that number and paying the $99 per year fee, then inviting Aaron onto the team.",
      owner: "Lisa", track: "Mobile app", status: "growing", due: "2026-06-26",
    },
    {
      title: "Wrap the app for iOS and Android",
      note: "Underway. We've wrapped the app into its iOS project, installed Apple's build tools, and it now builds and runs both in the simulator and on a real iPhone (using a temporary personal signing, so no paid account needed yet). Real-device testing surfaced a handful of genuine bugs (the scanner going dead after one scan, a dead-end nav tap, an empty recommendations state, some layout under the notch and home bar), all now fixed and merged into the main app. Wide TestFlight distribution still waits on the Apple Developer account. The Android build is next. Same codebase powers both, with a faster native barcode scanner to follow.",
      owner: "Aaron", track: "Mobile app", status: "growing", due: "2026-06-30",
    },
    {
      title: "Recruit our first beta testers",
      note: "Aim for 10 to 20 people who actually manage diabetes or prediabetes. Your network is the superpower here.",
      owner: "Lisa", track: "Beta", status: "sprout", due: "2026-06-27",
    },
    {
      title: "Write the App Store listing",
      note: "Name, one-line pitch, screenshots, description. We draft together; your voice, my screenshots.",
      owner: "Both", track: "Beta", status: "sprout",
    },
    {
      title: "Security pass before outside testers",
      note: "Rotate the app's access keys and double-check data permissions so testers' accounts are properly protected.",
      owner: "Aaron", track: "Mobile app", status: "sprout", due: "2026-06-26",
    },
  ],

  /* "Under the hood" tab: honest plain-language notes on how the smart parts
     of the app work today, where they fall short, and what the fix is. */
  engine: {
    intro:
      "The two smartest-looking parts of the app are the ones we most need to level up: " +
      "the similar-product suggestions after a scan, and the picks row on the home screen. " +
      "Here is an honest look at how each works today, where it falls short, and what we are doing about it. " +
      "None of this is bad news. The new database was built precisely so these fixes become straightforward.",
    features: [
      {
        name: "Similar products (the suggestions after a scan)",
        today:
          "When you scan something, the app searches the catalog for better-scoring products in the same " +
          "category, then ranks them by texture, flavor, brand, and store before showing the top three.",
        weaknesses: [
          {
            title: "It only looks at a sample, never the whole catalog",
            detail:
              "The app grabs the first few hundred products that loosely match and ranks just those. " +
              "For popular categories, the genuinely best alternative often never even enters the running.",
          },
          {
            title: "It guesses categories from words in the product name",
            detail:
              "Matching leans on category labels from barcode suppliers, which are messy, plus keyword guessing " +
              "from product names. A product with a terse or unusual name becomes invisible to the matcher.",
          },
          {
            title: "It does five or six separate searches per scan",
            detail:
              "Each one scans huge stretches of the old database table, so suggestions are slower than they " +
              "should be and will get slower as the catalog grows. The new database fixes exactly this.",
          },
          {
            title: "It inherits every scoring mistake",
            detail:
              "Only green products can be suggested. So a food scored too harshly (the coconut water case) can " +
              "never be recommended, and a food scored too kindly (the instant oatmeal case) can be. " +
              "Fixing the scoring rules directly upgrades the suggestions.",
          },
          {
            title: "Sometimes it shows nothing at all",
            detail:
              "When the category data on a product is thin, the safety filters drop everything and the user " +
              "sees zero suggestions, even when good alternatives exist in the catalog.",
          },
          {
            title: "It is the same for everyone",
            detail:
              "No dietary restrictions, no preferences, no history. Two very different people scanning the " +
              "same item get identical suggestions. Personalization is the next layer once the foundation is solid.",
          },
        ],
        plan:
          "Rebuild the search and ranking on the new database, where products carry properly indexed tags and " +
          "scores. The whole catalog gets considered, results come back instantly, and the best matches can be " +
          "precomputed ahead of time. We have now built a test set of real products and automated quality checks, " +
          "so every change to the scores and suggestions is provably better and not just different. " +
          "We have since run those checks across the whole catalog against trusted nutrition data, and they confirm " +
          "the upgraded engine correctly flags the items that were previously scored too kindly (the instant-oatmeal " +
          "case included). A small set of edge cases is being tightened before the beta.",
        due: "2026-07-02",
      },
      {
        name: "Diabetes-friendly picks (the row on the home screen)",
        today:
          "The home screen shows a rotating row of green-scored products from well-known brands.",
        weaknesses: [
          {
            title: "It is a hand-typed brand list, not real recommendations",
            detail:
              "Behind the scenes it is a fixed list of 22 brand names. The app pulls green products from those " +
              "brands and shuffles them. Nothing about it is smart yet.",
          },
          {
            title: "The instant-oatmeal moment came from this row",
            detail:
              "Its only quality check is the green score, and we know roughly three thousand products are " +
              "scored too kindly today. That is how a sweetened instant oatmeal ended up presented as a great choice.",
          },
          {
            title: "Random order, no reasons, nothing personal",
            detail:
              "Picks reshuffle on every visit, never explain why a product is good for you, and ignore your " +
              "restrictions, goals, and stores.",
          },
        ],
        plan:
          "The row now runs on the new database and the corrected, safer scores, so the too-kindly picks " +
          "(the instant-oatmeal case) no longer appear, and it loads fast. We also just hardened it so tapping " +
          "into a pick always pulls the product's real, current details rather than a cached snapshot. Still " +
          "ahead: replace the fixed brand list with a real query for the strongest-scoring products across a " +
          "healthy variety of categories, show the reasoning, and personalize once profiles carry restrictions " +
          "and preferences.",
        due: "2026-07-02",
      },
    ],
  },


  decisions: [
    {
      date: "2026-07-14",
      title: "The Sound Board lives inside HQ, not on the public website",
      why: "We first planned to host the scoring Sound Board as a hidden page on shophelthy.com, but publishing it there would have put our scoring recipe and a slice of our catalog data where anyone could read the source. Instead it ships inside HQ itself: it opens instantly from the header button, works even offline, needs no hosting bill, and our formula stays ours. Nothing about how it works for you and Nora changes.",
    },
    {
      date: "2026-07-12",
      title: "Private, anonymous usage stats for the alpha, with health data walled off",
      why: "To learn what to improve first, the alpha collects anonymous usage stats: which screens testers open, whether a scan succeeds, where people drop off. It is first-party only (just us understanding our own app, not ad tracking), which means Apple does not require the off-putting tracking permission prompt. Crucially, it never records what someone scans or any health or nutrition numbers, only that an action happened. Testers see a short notice and can switch it off in the app. That keeps us on the right side of Apple's health-data rules while still giving us the feedback an alpha needs.",
    },
    {
      date: "2026-06-23",
      title: "Add a blood-sugar safety check on top of the scoring, not a rebuild",
      why: "We stress-tested the current scoring against real public nutrition data, and it holds up well for the beta. To catch the few foods that can spike blood sugar without looking sugary (white rice and pasta are the classic examples), we added a glycemic-load safety check that sits on top of the existing engine. It is now built and tested: across a large sample of real products it only ever makes a score more cautious, never less, so it cannot introduce a new mistake, and it correctly flags the high-glycemic foods the old approach missed. The engine already built stays in place; this is a guardrail around it and a foundation we keep building on.",
    },
    {
      date: "2026-06-23",
      title: "Our website home will be shophelthy.com",
      why: "We chose shophelthy.com as the address for the Helthy website and decided to retire the old Wix site. The new site will run on a simple, low-cost host (Cloudflare or GoDaddy) without paying extra for premium page-builder tools, so our web presence stays inexpensive and easy to update as we grow.",
    },
    {
      date: "2026-06-23",
      title: "A private Discord community for our first testers",
      why: "When the alpha goes out, we will gather the first testers in a small private Discord. Keeping everyone in one place lets feedback flow easily and lets us ship fixes quickly while people are actively using the app, which keeps testers engaged and builds early loyalty.",
    },
    {
      date: "2026-06-23",
      title: "A subscription will fund the app as it scales",
      why: "Every scan leans on the product database and the AI lookups behind it, which cost money to run as usage grows. We agreed the plan is for a subscription to cover those server and storage costs, so the app can scale steadily and stay healthy rather than limiting how much people can use it.",
    },
    {
      date: "2026-06-09",
      title: "Beta in three weeks means TestFlight, public launch comes after",
      why: "Getting the app onto real testers' phones by end of June is achievable through Apple's TestFlight and Google's internal testing track. A public App Store launch follows once beta feedback and Apple's review are in. Same destination, two clear milestones instead of one risky one.",
    },
    {
      date: "2026-06-09",
      title: "Upgrade the database alongside the live app, not under it",
      why: "The new database is built next to the current one and switched over only after every check passes. Nothing the app does today breaks at any point, and the change can be undone in one step if we ever wanted to.",
    },
    {
      date: "2026-06-09",
      title: "One codebase for iOS and Android",
      why: "Instead of building two separate apps, we wrap the existing app the way Obsidian and many others do. Both platforms ship together, every improvement lands on both at once, and we move at twice the speed of split development.",
    },
    {
      date: "2026-06-09",
      title: "This folder is our HQ; Notion stays as the archive",
      why: "Neither of us could find anything in Notion and sharing files there was painful. This folder syncs itself between our computers, holds real files, and the dashboard always shows the current plan. If it is not in HQ, it is not the plan.",
    },
    {
      date: "2026-06-09",
      title: "Retire Notion; its content now lives in the Knowledge Base",
      why: "We are winding Notion down for good. The thinking worth keeping (product direction, the AI and health approach, a map of what the app already does, the iOS plan, and outreach notes) moved into Files/Knowledge Base. The empty placeholder pages and the old task lists did not come along, since the dashboard already covers tasks.",
    },
  ],

  files: [
    {
      path: "https://www.shophelthy.com/hq-4aceb8b9/",
      title: "This dashboard",
      desc: "The living plan: roadmap, tasks, decisions. Bookmark it.",
      kind: "hq",
    },
    {
      path: "Files/Welcome to Helthy HQ.md",
      title: "Welcome to Helthy HQ",
      desc: "Two-minute read on how this folder works and where things go.",
      kind: "md",
    },
    {
      path: "Files/Knowledge Base/README.md",
      title: "Knowledge Base",
      desc: "The thinking behind Helthy, moved here from Notion. Start with this index.",
      kind: "kb",
    },
    {
      path: "Files/Knowledge Base/What Helthy Does Today.md",
      title: "What Helthy Does Today",
      desc: "A plain-language map of every feature already built into the app.",
      kind: "md",
    },
    {
      path: "Files/Knowledge Base/Product Direction.md",
      title: "Product Direction",
      desc: "How the app should look and feel, the screens we are reshaping, products we study.",
      kind: "md",
    },
    {
      path: "Files/Knowledge Base/AI & Personalization.md",
      title: "AI & Personalization",
      desc: "How a scan becomes advice today, and where the intelligence is heading.",
      kind: "md",
    },
    {
      path: "Files/Knowledge Base/Health & Diet Approach.md",
      title: "Health & Diet Approach",
      desc: "What good for this person means, and the encouraging-not-punitive line we hold.",
      kind: "md",
    },
    {
      path: "Files/Knowledge Base/iOS App Plan.md",
      title: "iOS App Plan",
      desc: "Taking the web app to the App Store, plus the Apple Developer setup (Lisa's first step).",
      kind: "md",
    },
    {
      path: "Files/Knowledge Base/Go-to-Market Notes.md",
      title: "Go-to-Market Notes",
      desc: "Early outreach ideas and the path from first testers to launch.",
      kind: "md",
    },
  ],
};

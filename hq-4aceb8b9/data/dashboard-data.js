/* =====================================================================
   Helthy HQ: dashboard data
   This file is the single source the dashboard reads. Plain JavaScript,
   no build step: edit, save, reopen the dashboard. Aaron (or his Claude)
   keeps it current. Dates are YYYY-MM-DD.
   ===================================================================== */
window.HELTHY_DATA = {
  updated: "2026-07-14",
  /* Knowledge migrated out of Notion into Files/Knowledge Base/ on 2026-06-09. */

  /* Live backend: a dedicated Supabase project (PostgREST). When reachable, the
     Tasks tab reads/writes hq_tasks (the list below is the offline fallback and
     first-run seed) and the Meetings tab reads/writes hq_meetings. The publishable
     key is anon-scoped to those two tables only (safe to ship in this file; it
     cannot reach any other project). Schema: Lisa-app/Helthy/hq-supabase-schema.sql. */
  supabase: {
    url: "https://xnfobhzhczzviuhivimo.supabase.co/rest/v1",
    key: "sb_publishable_xnjjsu1dnc8HOrFbHiMGig_XTwjP_bT",
  },

  statusLine:
    'Two big ones landed. First, the rebuilt scoring engine is now <em>live across the whole database</em>: all ' +
    '510,000 products carry fresh scores from the new formula, checked against our calibration before we ' +
    'trusted it. Second, the <em>Sound Board</em> is ready and lives right here in HQ. Tap the fader icon in ' +
    'the header and the whole engine becomes a mixing desk: a fader for every trigger line (how much sugar, ' +
    'salt, or saturated fat starts costing points, and how much turns a food red), live meters showing how the ' +
    'entire catalog regrades as you slide, real foods rescoring in front of you with the reason shown, and a ' +
    'step-by-step walkthrough Nora can follow with a pencil for any product. Tuning takes zero code. Next up: ' +
    'a working session where you and Nora set the dials for real, then one rescore locks your numbers in.',

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
        { label: "iOS and Android app shell", start: "2026-06-10", end: "2026-06-30", progress: 95 },
        { label: "Apple Developer enrollment", start: "2026-06-09", end: "2026-07-12", progress: 100 },
        { label: "Security and keys hardening", start: "2026-06-22", end: "2026-07-02", progress: 0 },
      ],
    },
    {
      name: "Beta",
      bars: [
        { label: "Accounts and anonymous usage insights", start: "2026-07-11", end: "2026-07-14", progress: 80 },
        { label: "Tester invites and feedback rounds", start: "2026-06-30", end: "2026-07-17", progress: 0 },
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

  /* "UI" tab: the design and mobile-app work, run as light agile sprints.
     One sprint at a time, each with a single goal. Cards flow left to right:
     backlog (ideas, not scheduled) -> sprint (planned for this sprint) ->
     doing (in progress) -> done. blocked: true adds an amber "waiting" pill;
     blockedNote says what it is waiting on. epics maps each card to its theme. */
  ui: {
    celebration:
      "🎉 We're finally getting to the fun part. The database is solid and the app now runs end to end " +
      "on a real iPhone, bugs found and fixed along the way. From here it's about making it feel as good " +
      "as it works.",
    sprint: {
      number: 1,
      start: "2026-07-07",
      end: "2026-07-17",
      goal:
        "Make the recommendation screens feel as smart as the new engine underneath them, " +
        "and be ready to put the app on real phones the moment the Apple Developer account opens.",
    },
    epics: {
      recs:   "🥦 Smarter recommendations on screen",
      shell:  "📱 The app on your phone",
      alpha:  "🧪 Ready for testers",
      polish: "✨ Design polish",
    },
    stories: [
      {
        title: "Split the picks row into engine and display layers", epic: "recs", status: "done",
        note: "The home picks row now has a clean seam: the database feeds it, the design side draws it. This is what lets the engine work and the design work move in parallel safely.",
      },
      {
        title: "Wrap the app in its native iOS shell", epic: "shell", status: "done",
        note: "Helthy builds and runs in the iPhone simulator as a real iOS app, from the same codebase as the web version.",
      },
      {
        title: "Fit the layout around the notch and home bar", epic: "shell", status: "done",
        note: "The app now sits correctly on modern iPhone screens instead of hiding behind the notch or the home indicator.",
      },
      {
        title: "Redesign the home picks row", epic: "recs", status: "doing",
        note: "A fresh look for the diabetes-friendly picks: clearer cards, the corrected scores front and center, and room to explain why each product earned its spot.",
      },
      {
        title: "Redesign the similar-products panel", epic: "recs", status: "sprint",
        note: "The after-scan suggestions get the same treatment: a layout that makes the healthier swap feel obvious at a glance.",
      },
      {
        title: "Friendly empty and error moments", epic: "recs", status: "sprint",
        note: "When we have no good suggestion for a scan, the app should say why and what to try next. Never a blank space.",
      },
      {
        title: "App icon and launch screen", epic: "shell", status: "sprint",
        note: "The face of Helthy on a real home screen: the icon and the first moment the app opens.",
      },
      {
        title: "Run the app on a real iPhone", epic: "shell", status: "done",
        note: "Done, ahead of the Apple Developer account: Lisa greenlit personal-device testing on Aaron's own phone in the meantime. Verified end to end, camera and all.",
      },
      {
        title: "Fix bugs found while testing on a real phone", epic: "shell", status: "done",
        note: "First real-device pass turned up a scanner that froze after one scan, alternatives that went silent instead of saying why, and a couple of navigation and layout snags. All fixed and re-verified on the device.",
      },
      {
        title: "First TestFlight build for testers", epic: "shell", status: "doing",
        note: "Now unblocked: the Apple Developer account is in place. This is the build that goes out to our first testers' phones, and it is the immediate next step.",
      },
      {
        title: "Save your scan history to your account", epic: "alpha", status: "doing",
        note: "Built this week. Signing in now saves a tester's scan history to their account, so it survives reinstalls (constant during a beta) and follows them across devices. The app still works fully without an account; signing in just backs the history up and syncs it. Turns on with a small database addition.",
      },
      {
        title: "Private, anonymous usage insights", epic: "alpha", status: "doing",
        note: "Built this week. Anonymous stats on which screens testers use and whether scanning works, to guide what we improve first. First-party only (just us understanding our own app, no ad tracking), and it never logs what someone scans or any health numbers. Testers see a short notice and can switch it off. Connects once we plug in the analytics account.",
      },
      {
        title: "Show the why behind each pick", epic: "recs", status: "backlog",
        note: "Every recommendation should carry its reason in plain words, like “less added sugar than the one you scanned.” Waits on the engine exposing those reasons.",
      },
      {
        title: "A design pass over every main screen", epic: "polish", status: "backlog",
        note: "Navigation, spacing, and loading states reviewed screen by screen before the beta.",
      },
      {
        title: "Rethink Home's purpose and navigation", epic: "polish", status: "backlog",
        note: "First-time testing raised a real question: what is Home actually for as a landing spot? Worth reconsidering the app's navigation structure, including whether scan history fits better on Profile.",
      },
      {
        title: "Android build", epic: "shell", status: "backlog",
        note: "Same codebase, second platform. Comes after the iPhone path is proven end to end.",
      },
    ],
    how:
      "How this works: we run the design and mobile work in short sprints, each with one clear goal, " +
      "written at the top of this page. Cards move left to right as they progress, and a card that is " +
      "waiting on something outside the code says so right on its face. At the end of a sprint we look " +
      "at the Done column together, decide the next goal, and start the next sprint. If you want " +
      "something on this board, say it in a meeting or drop it in the Tasks tab and it becomes a card.",
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

  /* This is the hosted copy (served from shophelthy-site) — the Knowledge Base docs
     and the Files/ exchange folder still live only in the Syncthing-synced local HQ
     folder, so those links are intentionally left out here to avoid dead links. */
  files: [
    {
      path: "index.html",
      title: "This dashboard",
      desc: "The living plan: roadmap, tasks, decisions. Open it any time.",
      kind: "hq",
    },
  ],
};

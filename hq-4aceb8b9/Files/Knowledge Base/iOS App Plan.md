# iOS App Plan

How we take Helthy from its web build to a real iPhone app on the App Store. We use a tool called Capacitor, which wraps our existing app in a native iOS shell and gives it real access to the iPhone camera. Same codebase, now a genuine app, with the barcode and food scanning running as native features rather than a website in disguise.

> The dates below are planning estimates from when we mapped this out, assuming a start around the week of June 8. The dashboard holds the current, live dates. When the two disagree, trust the dashboard.

## How it works

Capacitor takes the exact web app we already build and packages it as a native iOS project we can open in Xcode and submit to Apple. We keep one codebase, so any change flows through to the app. The camera, barcode scanner, and photo access become real device features through Capacitor plugins.

The path: our web app, to GitHub for the source code, to Capacitor for the native wrapper, to Xcode for the iOS project, to the App Store live on iPhone.

### What we need first

- **A Mac.** iOS apps can only be built and submitted from macOS, and Aaron has this covered.
- **An Apple Developer account** (99 dollars a year, in the company's name). This is the one item to start on day one, since it gates everything later. See the setup section below.
- **Xcode** and its command-line tools (free, from the Mac App Store).
- **The project connected to GitHub** so the code can leave the web builder.

### Why this passes Apple's review

Apple rejects apps that are just a website in a shell (their Guideline 4.2). Helthy clears that bar comfortably, because the camera-based barcode and food scanning are real native device features. That native scanning is the reason we are going native, and it is exactly what Apple wants to see.

## The seven phases

Roughly five to six weeks from first export to App Store submission, with Apple's review time on top.

1. **Setup and accounts** (both of us). Confirm a Mac is available, enroll in the Apple Developer Program as an Organization account, and install the build toolchain (Xcode, command-line tools, Node, CocoaPods).
2. **Export from the web builder** (both). Put the project on GitHub with branches, pull the database down with the Supabase CLI, clone the repo, install dependencies, and verify the production web build.
3. **Add Capacitor and the iOS shell** (Aaron). Install and initialize Capacitor, add the iOS platform, and run the app on the iOS simulator.
4. **Native features** (Aaron). Add the camera and barcode-scanning plugins, set the permission strings, handle login deep links, generate the app icon and splash screen, and polish the safe area, status bar, and notch.
5. **Device testing and QA** (both). Run on a physical iPhone, test camera and barcode on the device, do full-flow QA across screen sizes, and a performance and offline pass.
6. **App Store prep** (both). Create the App Store Connect record, write the privacy policy and data-collection labels, run a health-app compliance check (no medical claims), prepare screenshots, description, and keywords, then archive, upload, and push to TestFlight.
7. **Submit and launch** (both). Run a TestFlight beta round, submit for App Store review, respond to feedback, and release Helthy to the App Store.

---

## Apple Developer enrollment (Lisa, this one is yours)

This is the first domino. The actual clicking takes about 30 minutes, but please start it early. Apple verifies the company before approving us, and that verification can take a few business days. Everything technical afterward depends on this account being live.

### Why a Company account

When Apple asks what kind of account to open, choose the **Organization (Company)** type, not Individual. Two reasons:

- The app publishes under the company's name, which is how a real venture should appear in the App Store.
- It lets Aaron join as a team member with his own login, so we build and submit together. An Individual account cannot add team members at all.

You will never need to share your Apple ID or password. Apple has a proper invite system, which is the last step below.

### Before you start

Have these ready:

- An Apple ID with two-factor authentication turned on (your normal Apple login is fine).
- The legal company name, address, and phone number, exactly as officially registered.
- A D-U-N-S number for the company (free, see step 1). **We have this now.**
- A credit card for the 99 dollars a year fee.
- The authority to agree to legal terms on behalf of the company.

### Step 1: Get the company's D-U-N-S number

> **Done (June 2026): Lisa secured the company's D-U-N-S number.** This step is complete and is kept here for reference. Skip ahead to step 2.

A D-U-N-S number is a free business ID Apple uses to confirm the company is real.

1. Go to Apple's lookup page: https://developer.apple.com/enroll/duns-lookup/
2. Enter the company details. If we already have a number, it appears. If not, request one for free from that same page.
3. A brand-new number can take a few business days, so do this part first.

If the company registration is not fully final yet, message Aaron before choosing the account type. There is a clean path either way, and a quick check now saves redoing anything later.

### Step 2: Enroll in the Apple Developer Program

1. Go to https://developer.apple.com/programs/enroll and sign in with your Apple ID.
2. When asked for entity type, choose Company / Organization, not Individual.
3. Enter the company's legal name, address, and D-U-N-S number, matching what is registered.
4. Submit. Apple may email or call to confirm you are authorized to sign for the company, so keep an eye out.

### Step 3: Pay the membership fee

Once Apple approves the company, pay the 99 dollars a year fee to activate the account. At that point the account is live.

### Step 4: Add Aaron to the team

1. Go to App Store Connect, Users and Access: https://appstoreconnect.apple.com/access/users
2. Click the plus to invite a new user, and enter Aaron's email (he will confirm which address).
3. Give him the Admin role, or Developer plus App Manager if you would rather keep Admin to yourself.
4. He accepts with his own Apple ID, and from there he handles the build, the signing, and the submission.

That is the whole account setup. Once it is done, the heavy technical lifting sits with Aaron, and you can hand off anything here you would rather not touch.

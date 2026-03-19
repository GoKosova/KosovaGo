import { useState } from "react";
import "./index.css";

export default function KosovaGoLandingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("idle");

  const highlights = [
    {
      title: "Discover Kosovo",
      description:
        "Find the best cities, landmarks, food spots, cafés, nightlife, and hidden gems across Kosovo.",
      emoji: "🗺️",
    },
    {
      title: "Events & Nightlife",
      description:
        "Stay on top of concerts, festivals, clubs, and local events so visitors always know where the vibe is.",
      emoji: "🎉",
    },
    {
      title: "Food & Coffee",
      description:
        "From traditional food to modern brunch spots, help travellers discover where to eat and drink.",
      emoji: "☕",
    },
    {
      title: "Travel Smarter",
      description:
        "Give tourists one place for recommendations, planning, and local guidance without endless searching.",
      emoji: "📍",
    },
  ];

  const featuredCities = ["Prishtina", "Prizren", "Peja", "Gjakova"];

  const handleSubmit = async () => {
    if (!email) return;

    try {
      const notifyResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: "service_8m7b6ng",
          template_id: "template_v9e7z3r",
          user_id: "9_B6qxEZcglmkiKlb",
          template_params: {
            user_email: email,
          },
        }),
      });

      if (!notifyResponse.ok) {
        const errorText = await notifyResponse.text();
        throw new Error(`EmailJS error: ${errorText}`);
      }

      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: "service_8m7b6ng",
          template_id: "template_sqphrdq",
          user_id: "9_B6qxEZcglmkiKlb",
          template_params: {
            user_email: email,
          },
        }),
      });

      setSubmitted(true);
      setEmail("");
      setStatus("sent");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_left,rgba(16,185,129,0.14),transparent_25%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
                Kosovo tourism, made actually useful
              </div>
              <h1 className="max-w-2xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                KosovaGo
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                The modern travel app for exploring Kosovo — discover places to visit,
                food to try, events to catch, and cities worth getting lost in.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#download"
                  className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:scale-[1.02]"
                >
                  Join the waitlist
                </a>
                <a
                  href="#features"
                  className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Explore features
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
                {featuredCities.map((city) => (
                  <span
                    key={city}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-900 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Trending now</p>
                      <h2 className="mt-1 text-2xl font-bold">Prizren</h2>
                    </div>
                    <div className="rounded-2xl bg-emerald-400/15 px-3 py-2 text-sm font-semibold text-emerald-300">
                      Popular
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-2xl bg-white/5 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold">Stone Bridge</p>
                          <p className="mt-1 text-sm text-slate-400">Historic landmark • Must-see</p>
                        </div>
                        <span className="text-xl">🌉</span>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold">Best local food spots</p>
                          <p className="mt-1 text-sm text-slate-400">Traditional dishes, cafés, desserts</p>
                        </div>
                        <span className="text-xl">🍽️</span>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold">Tonight’s events</p>
                          <p className="mt-1 text-sm text-slate-400">Live music, bars, nightlife</p>
                        </div>
                        <span className="text-xl">🎶</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {status === "sent" && (
                <p className="mt-4 text-emerald-400">Signup sent! Check your inbox/spam.</p>
              )}
              {status === "error" && (
                <p className="mt-4 text-red-400">Failed to send. Check console for details.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
            Why KosovaGo
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Everything you need to explore Kosovo in one place
          </h2>
          <p className="mt-4 text-slate-400">
            No more random blogs, outdated maps, or asking ten different people. KosovaGo gives you the best places, events, and experiences instantly.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur"
            >
              <div className="text-3xl">{item.emoji}</div>
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="download" className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-emerald-400/15 via-sky-400/10 to-transparent p-8 sm:p-10 lg:p-14">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Coming soon
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
              Launching soon on mobile
            </h2>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-5 py-4 text-white placeholder:text-slate-500 outline-none"
              />
              <button
                onClick={handleSubmit}
                className="rounded-2xl bg-white px-6 py-4 font-semibold text-slate-900 transition hover:scale-[1.02]"
              >
                {submitted ? "Added ✅" : "Notify me"}
              </button>
            </div>
          </div>
        </div>
      </section>
      
<footer className="mx-auto max-w-7xl px-6 pb-10 text-center text-xs text-slate-500">
  For any enquiries please contact us at{" "}
  <a
    href="mailto:gokosova@outlook.com"
    className="text-emerald-400 hover:underline"
  >
    gokosova@outlook.com
  </a>
</footer>

</div>
);
}

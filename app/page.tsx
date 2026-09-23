import About from "@/components/About";
import Footer from "@/components/Footer";
import FriendsSection from "@/components/FriendsSection";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import MapPanel from "@/components/MapPanel";
import MusingsSection from "@/components/MusingsSection";
import SectionHeading from "@/components/SectionHeading";
import SiteHeader from "@/components/SiteHeader";
import Timeline from "@/components/Timeline";
import { buildMapPoints } from "@/lib/cities";
import { getFriends, getGallery, getMusings, getProfile, getTimeline } from "@/lib/data";

export default function HomePage() {
  const profile = getProfile();
  const friends = getFriends();
  const timeline = getTimeline();
  const gallery = getGallery();
  const musings = getMusings();
  const mapPoints = buildMapPoints(friends, {
    name: profile.name,
    city: profile.city,
  });

  return (
    <>
      <SiteHeader siteName={profile.siteName ?? profile.name} logoChar={profile.name.slice(0, 1)} />

      <main>
        <Hero profile={profile} />

        <section id="about" className="section-anchor px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="About"
              title={`介绍一下我自己，认识一下${profile.name}`}
              icon="sparkle"
            />
            <About profile={profile} />
          </div>
        </section>

        <section id="friends" className="section-anchor px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Friends"
              title="我的伙伴们"
              description="聚是开心果，散是满天星"
              icon="users"
            />
            <FriendsSection friends={friends} />
          </div>
        </section>

        <section id="timeline" className="section-anchor px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Timeline"
              title="我们一起走过的时间线"
              description="从认识的第一天到现在，挑出一些还记得住的节点。"
              icon="clock"
            />
            <Timeline items={timeline} />
          </div>
        </section>

        <section id="gallery" className="section-anchor px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Gallery"
              title="记忆存储器"
              description="我们一路走来的痕迹"
              icon="image"
            />
            <Gallery items={gallery} />
          </div>
        </section>

        <section id="map" className="section-anchor px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Map"
              title="我们散落在这些城市"
              description="点一下光点，就能看到是谁。"
              icon="location"
            />
            <MapPanel points={mapPoints.points} />
            {(mapPoints.unknown.length > 0 || mapPoints.missing.length > 0) && (
              <p className="mt-4 text-xs leading-6 text-slate-400">
                尚未落点：{[...mapPoints.unknown, ...mapPoints.missing].join(" · ")}
              </p>
            )}
          </div>
        </section>

        <section id="musings" className="section-anchor px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <MusingsSection data={musings} />
          </div>
        </section>

        <Footer profile={profile} />
      </main>
    </>
  );
}

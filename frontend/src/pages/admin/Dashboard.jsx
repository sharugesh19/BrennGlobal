import { useEffect, useState } from "react";
import { HiOutlineCube, HiOutlineMail, HiOutlineSparkles, HiOutlineInboxIn } from "react-icons/hi";
import { getDashboardStats } from "../../lib/api/dashboard.js";
import { SkeletonBlock } from "../../components/ui/Skeleton.jsx";

const StatCard = ({ label, value, icon }) => (
  <div className="rounded-xl2 border border-ink/8 bg-white p-6">
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-brenn-yellow/15 text-xl text-brenn-yellow-dark">
      {icon}
    </div>
    <p className="text-3xl font-bold">{value}</p>
    <p className="mt-1 text-sm text-slate">{label}</p>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((data) => setStats(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-slate">Overview of your products and enquiries.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonBlock key={i} className="h-32 rounded-xl2" />)
        ) : (
          <>
            <StatCard label="Total Products" value={stats?.totalProducts ?? 0} icon={<HiOutlineCube />} />
            <StatCard label="Published" value={stats?.publishedProducts ?? 0} icon={<HiOutlineSparkles />} />
            <StatCard label="Total Enquiries" value={stats?.totalEnquiries ?? 0} icon={<HiOutlineMail />} />
            <StatCard label="New Enquiries" value={stats?.newEnquiries ?? 0} icon={<HiOutlineInboxIn />} />
          </>
        )}
      </div>

      <div className="mt-10 rounded-xl2 border border-ink/8 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold">Recent Enquiries</h2>
        {loading ? (
          <SkeletonBlock className="h-40" />
        ) : stats?.recentEnquiries?.length ? (
          <div className="divide-y divide-ink/8">
            {stats.recentEnquiries.map((m) => (
              <div key={m.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-medium">{m.name}</p>
                  <p className="text-slate">{m.email}</p>
                </div>
                <span className="rounded-full bg-cloud px-3 py-1 text-xs capitalize text-slate">{m.status}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate">No enquiries yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

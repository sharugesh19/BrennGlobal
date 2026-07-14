import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi";
import { listContactMessages, updateMessageStatus, deleteContactMessage } from "../../lib/api/contact.js";
import { SkeletonBlock } from "../../components/ui/Skeleton.jsx";

const STATUS_STYLES = {
  new: "bg-brenn-yellow/20 text-brenn-yellow-dark",
  read: "bg-gray-100 text-gray-600",
  replied: "bg-green-100 text-green-700",
  archived: "bg-gray-100 text-gray-400",
};

const ContactEnquiries = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    listContactMessages().then(setMessages).finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateMessageStatus(id, status);
      load();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteContactMessage(id);
      toast.success("Deleted");
      load();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Contact Enquiries</h1>
      <p className="mt-1 text-sm text-slate">Messages submitted through the contact form.</p>

      <div className="mt-8 space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonBlock key={i} className="h-28 rounded-xl2" />)
        ) : messages.length === 0 ? (
          <p className="text-sm text-slate">No messages yet.</p>
        ) : (
          messages.map((m) => (
            <div key={m.id} className="rounded-xl2 border border-ink/8 bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-sm text-slate">{m.email} {m.phone && `· ${m.phone}`}</p>
                  {m.subject && <p className="mt-1 text-sm font-medium">{m.subject}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={m.status}
                    onChange={(e) => handleStatusChange(m.id, e.target.value)}
                    className={`rounded-full border-none px-3 py-1 text-xs font-medium capitalize outline-none ${STATUS_STYLES[m.status]}`}
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                  <button onClick={() => handleDelete(m.id)} className="text-slate hover:text-red-500">
                    <HiOutlineTrash />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{m.message}</p>
              <p className="mt-3 text-xs text-slate">{new Date(m.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactEnquiries;

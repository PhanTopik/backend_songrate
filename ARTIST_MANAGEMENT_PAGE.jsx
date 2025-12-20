import React, { useState, useEffect } from "react";

export default function ArtistManagement() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArtist, setCurrentArtist] = useState(null);
  const [error, setError] = useState(null);

  const API_BASE = process.env.REACT_APP_API_URL || "";
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    bio: "",
    image: "",
    followers: 0,
    verified: false,
  });

  // Fetch all artists
  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/admin/artists`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch artists");
      const data = await res.json();
      setArtists(data.artists || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddArtist = async () => {
    try {
      if (!formData.name.trim()) {
        setError("Artist name is required");
        return;
      }
      
      const res = await fetch(`${API_BASE}/api/admin/artists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add artist");
      await fetchArtists();
      resetForm();
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateArtist = async () => {
    try {
      if (!formData.name.trim()) {
        setError("Artist name is required");
        return;
      }

      const res = await fetch(`${API_BASE}/api/admin/artists/${currentArtist.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update artist");
      await fetchArtists();
      resetForm();
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteArtist = async (id) => {
    if (!window.confirm("Are you sure you want to delete this artist?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/artists/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete artist");
      await fetchArtists();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOpenEdit = (artist) => {
    setCurrentArtist(artist);
    setFormData(artist);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsEditing(false);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      genre: "",
      bio: "",
      image: "",
      followers: 0,
      verified: false,
    });
    setCurrentArtist(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#1C1F26] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Artist Management</h1>
            <p className="text-gray-400">Manage all artists in your platform</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition"
          >
            + Add Artist
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-4 underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-400">Loading artists...</div>
          </div>
        ) : artists.length === 0 ? (
          <div className="text-center py-12 bg-[#2E333E] rounded-xl">
            <div className="text-gray-400">No artists yet. Add your first artist!</div>
          </div>
        ) : (
          /* Artists Table */
          <div className="bg-[#2E333E] rounded-xl overflow-hidden shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 bg-[#3E424B]">
                  <th className="text-left py-4 px-6 font-semibold">Name</th>
                  <th className="text-left py-4 px-6 font-semibold">Genre</th>
                  <th className="text-left py-4 px-6 font-semibold">Followers</th>
                  <th className="text-left py-4 px-6 font-semibold">Verified</th>
                  <th className="text-left py-4 px-6 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {artists.map((artist) => (
                  <tr
                    key={artist.id}
                    className="border-b border-gray-800 hover:bg-[#3E424B] transition"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        {artist.image && (
                          <img
                            src={artist.image}
                            alt={artist.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <div className="font-semibold">{artist.name}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-400">{artist.genre || "N/A"}</td>
                    <td className="py-4 px-6 text-gray-400">{artist.followers || 0}</td>
                    <td className="py-4 px-6">
                      {artist.verified ? (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-semibold">
                          ✓ Verified
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs">
                          Not Verified
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleOpenEdit(artist)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteArtist(artist.id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2E333E] rounded-xl p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-6">
                {isEditing ? "Edit Artist" : "Add New Artist"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Artist Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Taylor Swift"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Genre</label>
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    placeholder="e.g., Pop"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Artist biography..."
                    rows="3"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Followers</label>
                  <input
                    type="number"
                    name="followers"
                    value={formData.followers}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full px-4 py-2 bg-[#1C1F26] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="verified"
                    checked={formData.verified}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded"
                  />
                  <label className="ml-2 text-sm font-medium">Verified Artist</label>
                </div>
              </div>

              <div className="flex space-x-3 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={isEditing ? handleUpdateArtist : handleAddArtist}
                  className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition font-semibold"
                >
                  {isEditing ? "Update" : "Add"} Artist
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

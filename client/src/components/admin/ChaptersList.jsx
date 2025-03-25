import React, { useState } from "react";
import { toast } from "react-toastify";

const ChaptersList = ({ chapters, setSelectedChapter, setCourse, courseId }) => {
    const [chapterTitle, setChapterTitle] = useState("");

    // Add a new chapter
    const addChapter = async () => {
        if (!chapterTitle) {
            toast.error("Chapter title is required!");
            return;
        }
        try {
            const res = await fetch(`/api/admin/${courseId}/add-chapter`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chapterTitle }),
            });
            const updatedCourse = await res.json();
            setCourse(updatedCourse); // Update course state
            toast.success("Chapter added successfully!");
            setChapterTitle(""); // Clear input
        } catch (error) {
            toast.error("Failed to add chapter!");
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Chapters</h2>
            <ul className="space-y-3">
                {chapters.map((chapter) => (
                    <li
                        key={chapter._id}
                        className="p-3 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer"
                        onClick={() => setSelectedChapter(chapter)}
                    >
                        {chapter.chapterTitle}
                    </li>
                ))}
            </ul>

            <div className="mt-4">
                <input
                    type="text"
                    placeholder="New Chapter Title"
                    value={chapterTitle}
                    onChange={(e) => setChapterTitle(e.target.value)}
                    className="border border-gray-300 p-2 rounded w-full"
                />
                <button
                    onClick={addChapter}
                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Add Chapter
                </button>
            </div>
        </div>
    );
};

export default ChaptersList;
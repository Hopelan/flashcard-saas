"use client";
import { Button } from "@/components/ui/button";
import db from "@/firebase";
import { SignIn, UserButton, useUser } from "@clerk/nextjs";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { ReloadIcon } from "@radix-ui/react-icons";
import FlipMove from "react-flip-move";
import Card from "./Card";

export default function Component() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);

  const [title, setTitle] = useState("");
  const [mainTitle, setMainTitle] = useState("");
  const [text, setText] = useState("");
  const [newFlashcards, setNewFlashcards] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isCreate, setIsCreate] = useState(true);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getFlashcards() {
    if (!user) return;
    console.log(user.id);
    const q = query(
      collection(db, "Flashcards"),
      where("userId", "==", user.id)
    );

    try {
      const querySnapshot = await getDocs(q);
      let _topics = [];
      querySnapshot.forEach((doc) => {
        _topics.push({ id: doc.id, ...doc.data() });
      });
      console.log(_topics);
      setTopics(_topics);
      setLoading(false);
    } catch (e) {
      console.error("Error getting documents: ", e);
      setLoading(false);
    }
  }

  useEffect(() => {
    getFlashcards();
  }, [user]);

  const saveFlashcards = async () => {
    setIsSaving(true);

    try {
      const docRef = await addDoc(collection(db, "Flashcards"), {
        userId: user.id,
        title: title,
      });
      const parentDocRef = collection(db, "Flashcards", docRef.id, "content");
      await addDoc(parentDocRef, {
        cards: newFlashcards,
        // Add more fields as needed
      });
      toast.success("Saved Successfully");
      getFlashcards();
      setIsSaving(false);
      setIsSaved(true);
    } catch (e) {
      console.error("Error adding document: ", e);
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to generate flashcards.");
      return;
    }
    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      console.log(data);
      setTitle(data.title);
      setNewFlashcards(data.flashcards);
      setIsGenerating(false);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      toast.error(
        "An error occurred while generating flashcards. Please try again."
      );
      setIsGenerating(false);
    }
  };

  const toggleIsCreate = () => {
    setIsCreate(true);
  };

  const handleFlashcards = async (id, _title) => {
    const subCollectionRef = collection(db, "Flashcards", id, "content");
    const q = query(subCollectionRef);

    try {
      const querySnapshot = await getDocs(q);
      let _content = querySnapshot.docs[0].data();
      setMainTitle(_title);
      setFlashcards(_content.cards);
      setIsCreate(false);
    } catch (e) {
      console.error("Error retrieving documents: ", e);
    }
  };

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (isLoaded && !isSignedIn) {
    return <div>You are not signed in</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">A Level Flash</h1>
          <div className="flex items-center gap-4">
            <UserButton />
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-[300px_1fr] gap-6 p-6">
        <div className="bg-background rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary text-primary-foreground py-4 px-6">
            <h2 className="text-lg font-bold">My Flashcards</h2>
          </div>
          {loading ? (
            <div className="h-screen w-full">
              <div className="flex h-full items-center justify-center">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Loading topics..
              </div>
            </div>
          ) : (
            <ul className="p-4 space-y-2">
              {topics.map((topic, idx) => (
                <li
                  key={idx}
                  onClick={() => handleFlashcards(topic.id, topic.title)}
                  className="flex items-center justify-between bg-muted rounded-md px-4 py-2 hover:bg-muted/50 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <BookIcon className="w-6 h-6 text-muted-foreground" />
                    <span className="text-sm font-medium">{topic.title}</span>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
                </li>
              ))}
              <Button onClick={toggleIsCreate} className="w-full">
                <PlusIcon className="w-5 h-5 mr-2" />
                Create New Flashcard
              </Button>
            </ul>
          )}
        </div>

        <div className="bg-background rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary text-primary-foreground py-4 px-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {mainTitle ? mainTitle : "Create Flashcard"}
              </h2>
            </div>
          </div>
          {isCreate ? (
            <div className="w-full h-full p-5 space-y-5">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text."
              />
              <Button
                disabled={isGenerating}
                onClick={handleSubmit}
                className="w-full"
              >
                {isGenerating && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isGenerating ? "Generating..." : "Generate Flashcards"}
              </Button>
              <hr />
              <div>
                {newFlashcards.length > 0 && (
                  <div>
                    <div>
                      <Button
                        disabled={isSaved || isSaving}
                        onClick={saveFlashcards}
                      >
                        {isSaving && (
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        )}

                        {isSaving ? "Saving..." : "Save Flashcards"}
                      </Button>
                    </div>

                    <div className="space-y-4 mt-2">
                      {newFlashcards.map((newFlashCard, idx) => (
                        <div
                          key={idx}
                          className="bg-muted rounded-md p-4 shadow-sm"
                        >
                          <h3 className="text-lg font-medium">
                            {newFlashCard.front}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {newFlashCard.back}
                          </p>
                          <div className="flex justify-end mt-4">
                            <Button variant="ghost" size="sm">
                              <EyeIcon className="w-5 h-5" />
                              <span className="sr-only">View Answer</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {flashcards.map((flashcard, idx) => (
                <Card key={idx} flashcard={flashcard} />
              ))}
            </div>
          )}
        </div>
      </main>
      <footer className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between"></footer>
    </div>
  );
}

function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

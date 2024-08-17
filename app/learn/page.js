"use client";
import { Button } from "@/components/ui/button";
import db from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";

export default function Component() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [newFlashcards, setNewFlashcards] = useState([1, 2, 3]);
  const [topics, setTopics] = useState([]);
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setTopics(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to generate flashcards.");
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      setNewFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    }
  };

  const toggleIsCreate = () => {
    setIsCreate(!isCreate);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Flashcard App</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <SettingsIcon className="w-6 h-6" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon">
              <UserIcon className="w-6 h-6" />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-[300px_1fr] gap-6 p-6">
        <div className="bg-background rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary text-primary-foreground py-4 px-6">
            <h2 className="text-lg font-bold">My Flashcards</h2>
          </div>
          <div className="p-4 space-y-2">
            {topics.map((flashcard) => (
              <Link
                href="#"
                className="flex items-center justify-between bg-muted rounded-md px-4 py-2 hover:bg-muted/50"
                prefetch={false}
              >
                <div className="flex items-center gap-4">
                  <BookIcon className="w-6 h-6 text-muted-foreground" />
                  <span className="text-sm font-medium">Biology</span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
              </Link>
            ))}
            <Button onClick={toggleIsCreate} className="w-full">
              <PlusIcon className="w-5 h-5 mr-2" />
              Create New Flashcard
            </Button>
          </div>
        </div>
        <div className="bg-background rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary text-primary-foreground py-4 px-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Biology</h2>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                  <FilePenIcon className="w-5 h-5" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <MoveHorizontalIcon className="w-5 h-5" />
                  <span className="sr-only">More</span>
                </Button>
              </div>
            </div>
          </div>
          {isCreate ? (
            <div className="w-full h-full p-5 space-y-5">
              <Textarea placeholder="Enter text." />
              <Button className="w-full">Generate Flashcards</Button>
              <hr />
              <div>
                {newFlashcards.length > 0 && (
                  <div>
                    <div>
                      <Button>Save Flashcards</Button>
                    </div>

                    <div>
                      {newFlashcards.map((newFlashCard) => (
                        <div className="bg-muted rounded-md p-4 shadow-sm">
                          <h3 className="text-lg font-medium">
                            What is the difference between DNA and RNA?
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            DNA is the genetic material that stores hereditary
                            information, while RNA is a single-stranded molecule
                            that carries genetic instructions from DNA to the
                            ribosome for protein synthesis.
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
              <div className="bg-muted rounded-md p-4 shadow-sm">
                <h3 className="text-lg font-medium">
                  What is the function of mitochondria?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Mitochondria are the powerhouses of the cell, responsible for
                  producing energy through cellular respiration.
                </p>
                <div className="flex justify-end mt-4">
                  <Button variant="ghost" size="sm">
                    <EyeIcon className="w-5 h-5" />
                    <span className="sr-only">View Answer</span>
                  </Button>
                </div>
              </div>
              <div className="bg-muted rounded-md p-4 shadow-sm">
                <h3 className="text-lg font-medium">
                  What is the difference between DNA and RNA?
                </h3>
                <p className="text-sm text-muted-foreground">
                  DNA is the genetic material that stores hereditary
                  information, while RNA is a single-stranded molecule that
                  carries genetic instructions from DNA to the ribosome for
                  protein synthesis.
                </p>
                <div className="flex justify-end mt-4">
                  <Button variant="ghost" size="sm">
                    <EyeIcon className="w-5 h-5" />
                    <span className="sr-only">View Answer</span>
                  </Button>
                </div>
              </div>
              <div className="bg-muted rounded-md p-4 shadow-sm">
                <h3 className="text-lg font-medium">
                  What is the role of photosynthesis in plants?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Photosynthesis is the process by which plants use sunlight,
                  water, and carbon dioxide to produce oxygen and energy in the
                  form of glucose.
                </p>
                <div className="flex justify-end mt-4">
                  <Button variant="ghost" size="sm">
                    <EyeIcon className="w-5 h-5" />
                    <span className="sr-only">View Answer</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <BookIcon className="w-6 h-6" />
            <span className="sr-only">Study</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ClipboardIcon className="w-6 h-6" />
            <span className="sr-only">Practice</span>
          </Button>
          <Button variant="ghost" size="icon">
            <BarChart2Icon className="w-6 h-6" />
            <span className="sr-only">Progress</span>
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <SearchIcon className="w-6 h-6" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon">
            <MenuIcon className="w-6 h-6" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </footer>
    </div>
  );
}

function BarChart2Icon(props) {
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
      <line x1="18" x2="18" y1="20" y2="10" />
      <line x1="12" x2="12" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="14" />
    </svg>
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

function ClipboardIcon(props) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function EyeIcon(props) {
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function FilePenIcon(props) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MoveHorizontalIcon(props) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
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

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SettingsIcon(props) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

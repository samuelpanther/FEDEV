import "dotenv/config";
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const COVER_LETTER_HOST = "ai-resume-cover-letter-generator-job-application-api.p.rapidapi.com";
const RAPIDAPI_HOST = "jsearch.p.rapidapi.com";

function buildJSearchQuery({ query, location }) {
  const q = (query ?? "").toString().trim();
  const loc = (location ?? "").toString().trim();
  if (!q && !loc) return "";
  if (q && !loc) return q;
  if (!q && loc) return `jobs in ${loc}`;
  return `${q} jobs in ${loc}`;
}

// --- JOBS ENDPOINT ---
app.get("/jobs", async (req, res) => {
  try {
    if (!RAPIDAPI_KEY) {
      return res.status(500).json({ error: "Missing RAPIDAPI_KEY on server" });
    }

    const {
      query,
      location,
      page = "1",
      num_pages = "1",
      country = "us",
      date_posted = "all",
      employment_type = "all",
    } = req.query;

    const builtQuery = buildJSearchQuery({ query, location });
    if (!builtQuery) {
      return res.status(400).json({ error: "Please provide query and/or location" });
    }

    // CRASH PROTECTION: Logic to handle "USA" vs "Poland" vs empty box
    const safeCountry = (country || "us").toString().toLowerCase();
    const finalCountryCode = safeCountry === "usa" ? "us" : safeCountry;

    const response = await axios.get(`https://${RAPIDAPI_HOST}/search`, {
      params: {
        query: builtQuery,
        page,
        num_pages,
        country: finalCountryCode,
        date_posted,
        employment_types: employment_type === "all" ? undefined : employment_type.toUpperCase(),
      },
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": RAPIDAPI_HOST,
        "x-rapidapi-key": RAPIDAPI_KEY,
      },
    });

    console.log(`SUCCESS: Data received from JSearch for ${finalCountryCode}`);

    const rawJobs = response?.data?.data ?? [];
    const jobs = rawJobs.map((j) => ({
      id: j.job_id ?? j.job_apply_link ?? `${j.employer_name ?? ""}-${j.job_title ?? ""}`,
      title: j.job_title ?? "",
      company: j.employer_name ?? "",
      location: [j.job_city, j.job_state, j.job_country].filter(Boolean).join(", "),
      employmentType: j.job_employment_type ?? "",
      postedAt: j.job_posted_at_datetime_utc ?? "",
      description: j.job_description ?? "",
      applyLink: j.job_apply_link ?? j.job_google_link ?? "",
      source: j.job_publisher ?? "",
    }));

    res.json({ jobs });

  } catch (error) {
    console.error("JSearch request failed:", error.message);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// --- COVER LETTER ENDPOINT ---
app.post("/cover-letter", async (req, res) => {
  try {
    const { resume, job } = req.body;

    const apiData = {
      name: "Applicant",
      experience: [resume],
      skills: ["Refer to resume"],
      job: job.title,
      language: "en",
      sector: "technology",
      tone: "formal",
      format: "json"
    };

    const response = await axios.post(
      `https://${COVER_LETTER_HOST}/generate-resume`,
      apiData,
      {
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": COVER_LETTER_HOST,
          "x-rapidapi-key": RAPIDAPI_KEY,
        },
      }
    );

    const letter = response.data.coverLetter || response.data.content || "Letter generated!";
    res.json({ message: letter });

  } catch (error) {
    console.error("Cover Letter Error:", error.message);
    res.status(500).json({
      error: "Failed to generate",
      message: "The API is having trouble reading the resume format."
    });
  }
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
-- CreateEnum
CREATE TYPE "BrowserName" AS ENUM ('CHROME', 'SAFARI', 'FIREFOX', 'EDGE', 'OTHER');

-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('DESKTOP', 'MOBILE', 'TABLET');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'SHORT_TEXT', 'LONG_TEXT');

-- CreateEnum
CREATE TYPE "ResponseStatus" AS ENUM ('STARTED', 'COMPLETED');

-- CreateTable
CREATE TABLE "answers" (
    "id" TEXT NOT NULL,
    "response_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "option_id" TEXT,
    "text_answer" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "options" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "capacity_limit" INTEGER,
    "current_count" INTEGER NOT NULL DEFAULT 0,
    "order_index" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "survey_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "description" TEXT,
    "question_type" "QuestionType" NOT NULL DEFAULT 'SINGLE_CHOICE',
    "order_index" INTEGER NOT NULL,
    "is_required" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "responses" (
    "id" TEXT NOT NULL,
    "survey_id" TEXT NOT NULL,
    "respondent_name" TEXT NOT NULL,
    "respondent_phone" TEXT NOT NULL,
    "respondent_address" TEXT,
    "respondent_email" TEXT,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "device_type" "DeviceType",
    "browser_name" "BrowserName",
    "status" "ResponseStatus" NOT NULL DEFAULT 'COMPLETED',
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surveys" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "preview_content" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "answers_option_id_idx" ON "answers"("option_id");

-- CreateIndex
CREATE INDEX "answers_question_id_idx" ON "answers"("question_id");

-- CreateIndex
CREATE INDEX "answers_response_id_idx" ON "answers"("response_id");

-- CreateIndex
CREATE INDEX "options_question_id_idx" ON "options"("question_id");

-- CreateIndex
CREATE INDEX "questions_survey_id_idx" ON "questions"("survey_id");

-- CreateIndex
CREATE INDEX "responses_status_idx" ON "responses"("status");

-- CreateIndex
CREATE INDEX "responses_survey_id_idx" ON "responses"("survey_id");

-- CreateIndex
CREATE INDEX "surveys_user_id_idx" ON "surveys"("user_id");

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_response_id_fkey" FOREIGN KEY ("response_id") REFERENCES "responses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

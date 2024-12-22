'use client';

import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  PlayIcon,
  StopIcon,
  ArrowRightIcon,
  VideoIcon,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

interface VideoInterviewProps {
  questions: string[];
  jobId: string;
  candidateId: string;
  onComplete: () => void;
}

export function VideoInterview({
  questions,
  jobId,
  candidateId,
  onComplete,
}: VideoInterviewProps) {
  const [currentQuestion, setCurrentQuestion] = useState <boltAction type="file" filePath="components/dashboard/video-interview.tsx">(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<string[]>([]);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleStartRecording = () => {
    if (webcamRef.current?.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordings((prev) => [...prev, url]);
        chunksRef.current = [];

        if (currentQuestion === questions.length - 1) {
          await saveInterview();
        }
      };
      chunksRef.current = [];
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const saveInterview = async () => {
    try {
      const responses = recordings.map((url, index) => ({
        question: questions[index],
        response_url: url,
      }));

      await supabase.from('video_interviews').insert({
        job_id: jobId,
        candidate_id: candidateId,
        questions,
        responses,
        completed_at: new Date().toISOString(),
      });

      onComplete();
    } catch (error) {
      console.error('Error saving interview:', error);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">
          Question {currentQuestion + 1} of {questions.length}
        </h3>
        <p className="text-lg">{questions[currentQuestion]}</p>
      </div>

      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
        <Webcam
          ref={webcamRef}
          audio
          muted
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-center gap-4">
        {!isRecording ? (
          <Button onClick={handleStartRecording}>
            <PlayIcon className="mr-2 h-4 w-4" />
            Start Recording
          </Button>
        ) : (
          <Button variant="destructive" onClick={handleStopRecording}>
            <StopIcon className="mr-2 h-4 w-4" />
            Stop Recording
          </Button>
        )}
        {recordings[currentQuestion] && !isRecording && (
          <Button
            variant="outline"
            onClick={handleNextQuestion}
            disabled={currentQuestion === questions.length - 1}
          >
            Next Question
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {recordings.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Your Recordings</h4>
          <div className="grid gap-4">
            {recordings.map((url, index) => (
              <div key={index} className="flex items-center gap-4">
                <VideoIcon className="h-5 w-5" />
                <span>Question {index + 1} Recording</span>
                <Button variant="link" asChild>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    Review Recording
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
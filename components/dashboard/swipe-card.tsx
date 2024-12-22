'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, XIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SwipeCardProps {
  item: any;
  onSwipe: (direction: 'left' | 'right') => void;
  type: 'job' | 'candidate';
}

export function SwipeCard({ item, onSwipe, type }: SwipeCardProps) {
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const handleSwipe = (newDirection: 'left' | 'right') => {
    setDirection(newDirection);
    setTimeout(() => {
      onSwipe(newDirection);
      setDirection(null);
    }, 300);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 1 }}
        animate={{
          scale: 1,
          x: direction === 'left' ? -200 : direction === 'right' ? 200 : 0,
          opacity: direction ? 0 : 1,
        }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-md mx-auto p-6">
          <div className="space-y-4">
            {type === 'job' ? (
              <>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="text-lg text-muted-foreground">{item.company}</p>
                <div className="flex flex-wrap gap-2">
                  {item.requirements?.map((req: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {req}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm">{item.description}</p>
                {item.salary_range && (
                  <p className="text-sm text-muted-foreground">
                    Salary: ${item.salary_range.min.toLocaleString()} - $
                    {item.salary_range.max.toLocaleString()}
                  </p>
                )}
              </>
            ) : (
              <>
                <h3 className="text-2xl font-semibold">{item.full_name}</h3>
                <p className="text-lg text-muted-foreground">{item.title}</p>
                <div className="flex flex-wrap gap-2">
                  {item.skills?.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm">{item.bio}</p>
              </>
            )}
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
              onClick={() => handleSwipe('left')}
            >
              <XIcon className="h-6 w-6" />
            </Button>
            <Button
              size="lg"
              variant="default"
              className="rounded-full"
              onClick={() => handleSwipe('right')}
            >
              <CheckIcon className="h-6 w-6" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
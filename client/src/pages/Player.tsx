
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Star, Play } from 'lucide-react';
import HorizontalSection from '@/components/HorizontalSection';

const Player = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const content = location.state || {};

  const mockSeasons = [
    {
      id: 1,
      title: 'Season 1',
      episodes: [
        { id: 1, title: 'Episode 1: The Beginning', duration: '45 min', thumbnail: '/placeholder.svg' },
        { id: 2, title: 'Episode 2: The Journey', duration: '42 min', thumbnail: '/placeholder.svg' },
        { id: 3, title: 'Episode 3: The Discovery', duration: '48 min', thumbnail: '/placeholder.svg' },
      ]
    },
    {
      id: 2,
      title: 'Season 2',
      episodes: [
        { id: 4, title: 'Episode 1: New Beginnings', duration: '46 min', thumbnail: '/placeholder.svg' },
        { id: 5, title: 'Episode 2: The Challenge', duration: '44 min', thumbnail: '/placeholder.svg' },
      ]
    },
    {
      id: 3,
      title: 'Season 3',
      episodes: [
        { id: 6, title: 'Episode 1: The Return', duration: '48 min', thumbnail: '/placeholder.svg' },
        { id: 7, title: 'Episode 2: The Final Battle', duration: '52 min', thumbnail: '/placeholder.svg' },
      ]
    },
    {
      id: 4,
      title: 'Season 4',
      episodes: [
        { id: 8, title: 'Episode 1: New Era', duration: '44 min', thumbnail: '/placeholder.svg' },
        { id: 9, title: 'Episode 2: The Legacy', duration: '46 min', thumbnail: '/placeholder.svg' },
      ]
    }
  ];

  const mockEpisodes = [
    { id: 1, title: 'Episode 1', rating: 'TV-PG', score: '8.5', image: '/placeholder.svg' },
    { id: 2, title: 'Episode 2', rating: 'TV-PG', score: '8.7', image: '/placeholder.svg' },
    { id: 3, title: 'Episode 3', rating: 'TV-PG', score: '8.3', image: '/placeholder.svg' },
  ];

  const getSeasonsText = () => {
    if (content.type === 'Web Series' || content.content_type === 'Web Series') {
      const seasons = content.seasons || mockSeasons.length;
      return `${seasons} Season${seasons > 1 ? 's' : ''}`;
    }
    return null;
  };

  const getEpisodesText = () => {
    if (content.content_type === 'Show' || content.type === 'Show') {
      const episodes = content.episodes || mockEpisodes.length;
      return `${episodes} Episode${episodes > 1 ? 's' : ''}`;
    }
    return null;
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="pt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              size="sm"
              className="bg-primary/5 backdrop-blur-sm border border-primary/30 text-primary hover:bg-gradient-to-br hover:from-black/30 hover:via-[#0A7D4B]/5 hover:to-black/30 hover:border-primary/20 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          <Card className="bg-gradient-to-br from-black/90 via-[#0A7D4B]/20 to-black/90 backdrop-blur-sm border border-border/50 wave-transition relative overflow-hidden">
            {/* Animated Background Waves */}
            <div className="absolute inset-0">
              <div className="player-wave-bg-1"></div>
              <div className="player-wave-bg-2"></div>
              <div className="player-wave-bg-3"></div>
            </div>

            <CardHeader className="pb-4 relative z-10">
              {/* Video Player - 85% width */}
              <div className="w-[85%] mx-auto">
                <div className="aspect-video bg-black rounded-lg mb-4 relative">
                  <video
                    className="w-full h-full rounded-lg"
                    controls
                    poster={content.image || content.thumbnail_url}
                  >
                    <source src={content.videoUrl || content.video_url || '/placeholder-video.mp4'} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Content Info */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold text-foreground mb-2">
                    {content.title}
                  </CardTitle>
                  
                  <div className="flex items-center space-x-3 mb-3 flex-wrap">
                    {(content.rating || content.rating_type) && (
                      <span className="bg-primary/20 text-primary px-2 py-1 rounded border border-primary/30 text-xs font-medium">
                        {content.rating || content.rating_type}
                      </span>
                    )}
                    {(content.year || content.release_year) && (
                      <span className="text-muted-foreground text-xs">{content.year || content.release_year}</span>
                    )}
                    {(content.score || content.rating) && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-foreground text-xs">{content.score || content.rating}</span>
                      </div>
                    )}
                    {content.duration && (
                      <span className="text-muted-foreground text-xs">{content.duration} min</span>
                    )}
                    {(content.genre || content.genres) && (
                      <span className="text-muted-foreground text-xs">
                        {Array.isArray(content.genre || content.genres) 
                          ? (content.genre || content.genres).join(', ') 
                          : (content.genre || content.genres)}
                      </span>
                    )}
                    {getEpisodesText() && (
                      <span className="bg-blue-900/25 text-blue-200 px-2 py-1 rounded border border-blue-800/40 text-xs font-medium">
                        {getEpisodesText()}
                      </span>
                    )}
                  </div>

                  {content.description && (
                    <p className="text-foreground/90 text-sm leading-relaxed mb-3 break-words">
                      {content.description}
                    </p>
                  )}

                  {getSeasonsText() && (
                    <p className="text-muted-foreground text-sm">
                      {getSeasonsText()}
                    </p>
                  )}
                </div>

                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="outline"
                    className="bg-primary/10 backdrop-blur-sm border border-primary/50 text-primary hover:bg-gradient-to-br hover:from-black/60 hover:via-[#0A7D4B]/10 hover:to-black/60 hover:border-primary/30 transition-all duration-300 px-3 py-1.5 text-xs"
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Trailer
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative z-10">
              {/* Episodes/Seasons Section */}
              {(content.type === 'Web Series' || content.content_type === 'Web Series' || content.type === 'Show' || content.content_type === 'Show') ? (
                (content.type === 'Show' || content.content_type === 'Show') ? (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Episodes</h3>
                    <HorizontalSection
                      title=""
                      contents={mockEpisodes}
                      onSeeMore={() => {}}
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Available Seasons</h3>
                    <Tabs defaultValue="season-1" className="w-full">
                      <TabsList className="grid w-full bg-background/50 border border-border/50" style={{
                        gridTemplateColumns: `repeat(${Math.min(mockSeasons.length, 4)}, 1fr)`,
                        gridTemplateRows: mockSeasons.length > 4 ? 'repeat(2, 1fr)' : '1fr'
                      }}>
                        {mockSeasons.map((season) => (
                          <TabsTrigger
                            key={season.id}
                            value={`season-${season.id}`}
                            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-xs px-2 py-1"
                          >
                            {season.title}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      
                      {mockSeasons.map((season) => (
                        <TabsContent key={season.id} value={`season-${season.id}`} className="mt-4">
                          <div className="space-y-3">
                            {season.episodes.map((episode) => (
                              <div
                                key={episode.id}
                                className="flex items-center space-x-4 p-3 bg-background/30 rounded-lg border border-border/30 hover:bg-background/50 transition-colors cursor-pointer"
                              >
                                <img
                                  src={episode.thumbnail}
                                  alt={episode.title}
                                  className="w-20 h-12 object-cover rounded"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    if (target.src !== '/placeholder.svg') {
                                      target.src = '/placeholder.svg';
                                    }
                                  }}
                                />
                                <div className="flex-1">
                                  <h4 className="text-foreground font-medium text-sm">{episode.title}</h4>
                                  <p className="text-muted-foreground text-xs">{episode.duration}</p>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="bg-gradient-to-br from-black/60 via-[#0A7D4B]/10 to-black/60 backdrop-blur-sm border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                                >
                                  <Play className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                )
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Player;

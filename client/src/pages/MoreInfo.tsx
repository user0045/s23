import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Play, Star, Calendar, Clock } from 'lucide-react';

const MoreInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const content = location.state || {};

  console.log('MoreInfo received content:', content);

  const handlePlayClick = () => {
    navigate('/player', {
      state: content
    });
  };

  // Helper function to get image URL
  const getImageUrl = () => {
    return content.image || content.thumbnail_url || '/placeholder.svg';
  };

  // Helper function to get title
  const getTitle = () => {
    return content.title || 'Unknown Title';
  };

  // Helper function to get description
  const getDescription = () => {
    if (content.originalData?.web_series?.seasons?.[0]?.season_description) {
      return content.originalData.web_series.seasons[0].season_description;
    }
    if (content.originalData?.movie?.description) {
      return content.originalData.movie.description;
    }
    if (content.originalData?.show?.description) {
      return content.originalData.show.description;
    }
    return content.description || 'No description available';
  };

  // Helper function to get year
  const getYear = () => {
    if (content.originalData?.web_series?.seasons?.[0]?.release_year) {
      return content.originalData.web_series.seasons[0].release_year;
    }
    if (content.originalData?.movie?.release_year) {
      return content.originalData.movie.release_year;
    }
    if (content.originalData?.show?.release_year) {
      return content.originalData.show.release_year;
    }
    return content.year || 'Unknown';
  };

  // Helper function to get rating
  const getRating = () => {
    if (content.originalData?.web_series?.seasons?.[0]?.rating_type) {
      return content.originalData.web_series.seasons[0].rating_type;
    }
    if (content.originalData?.movie?.rating_type) {
      return content.originalData.movie.rating_type;
    }
    if (content.originalData?.show?.rating_type) {
      return content.originalData.show.rating_type;
    }
    return content.rating || 'Not Rated';
  };

  // Helper function to get score
  const getScore = () => {
    if (content.originalData?.web_series?.seasons?.[0]?.rating) {
      return content.originalData.web_series.seasons[0].rating;
    }
    if (content.originalData?.movie?.rating) {
      return content.originalData.movie.rating;
    }
    if (content.originalData?.show?.rating) {
      return content.originalData.show.rating;
    }
    return content.score || 'N/A';
  };

  // Helper function to get content type
  const getContentType = () => {
    if (content.originalData?.content_type) {
      return content.originalData.content_type;
    }
    return content.type === 'series' ? 'Web Series' : 
           content.type === 'movie' ? 'Movie' : 
           content.type || 'Unknown';
  };

  // Helper function to get duration or season info
  const getDurationOrSeason = () => {
    const contentType = getContentType();

    if (contentType === 'Movie') {
      const duration = content.originalData?.movie?.duration;
      return duration ? `${duration} min` : null;
    } else if (contentType === 'Web Series') {
      return content.seasonNumber ? `Season ${content.seasonNumber}` : 'Season 1';
    }
    return null;
  };

  // Helper function to get episode count
  const getEpisodeCount = () => {
    const contentType = getContentType();

    if (contentType === 'Web Series') {
      const episodes = content.originalData?.web_series?.seasons?.[0]?.episodes?.length ||
                      content.originalData?.web_series?.seasons?.[0]?.episode_id_list?.length;
      return episodes ? `${episodes} Episode${episodes > 1 ? 's' : ''}` : null;
    } else if (contentType === 'Show') {
      const episodes = content.originalData?.show?.episode_id_list?.length;
      return episodes ? `${episodes} Episode${episodes > 1 ? 's' : ''}` : null;
    }
    return null;
  };

  // Helper function to get directors
  const getDirectors = () => {
    let directors = [];

    // Check content type and access appropriate data
    const contentType = getContentType();
    
    if (contentType === 'Movie') {
      // For movies, check movie data structure
      if (content.movie?.director) {
        directors = Array.isArray(content.movie.director) 
          ? content.movie.director 
          : [content.movie.director];
      } else if (content.originalData?.movie?.director) {
        directors = Array.isArray(content.originalData.movie.director) 
          ? content.originalData.movie.director 
          : [content.originalData.movie.director];
      }
    } else if (contentType === 'Web Series') {
      // For web series, check season data
      if (content.web_series?.seasons?.[0]?.director) {
        directors = Array.isArray(content.web_series.seasons[0].director) 
          ? content.web_series.seasons[0].director 
          : [content.web_series.seasons[0].director];
      } else if (content.originalData?.web_series?.seasons?.[0]?.director) {
        directors = Array.isArray(content.originalData.web_series.seasons[0].director) 
          ? content.originalData.web_series.seasons[0].director 
          : [content.originalData.web_series.seasons[0].director];
      }
    } else if (contentType === 'Show') {
      // For shows, check show data
      if (content.show?.directors) {
        directors = Array.isArray(content.show.directors) 
          ? content.show.directors 
          : [content.show.directors];
      } else if (content.originalData?.show?.directors) {
        directors = Array.isArray(content.originalData.show.directors) 
          ? content.originalData.show.directors 
          : [content.originalData.show.directors];
      }
    }

    // Fallback to generic directors field
    if (directors.length === 0 && content.directors) {
      directors = Array.isArray(content.directors) 
        ? content.directors 
        : [content.directors];
    }

    console.log('Directors found:', directors, 'Content type:', contentType, 'Content:', content);
    return directors.filter(d => d && d.trim() !== '');
  };

  // Helper function to get writers
  const getWriters = () => {
    let writers = [];

    // Check content type and access appropriate data
    const contentType = getContentType();
    
    if (contentType === 'Movie') {
      // For movies, check movie data structure
      if (content.movie?.writer) {
        writers = Array.isArray(content.movie.writer) 
          ? content.movie.writer 
          : [content.movie.writer];
      } else if (content.originalData?.movie?.writer) {
        writers = Array.isArray(content.originalData.movie.writer) 
          ? content.originalData.movie.writer 
          : [content.originalData.movie.writer];
      }
    } else if (contentType === 'Web Series') {
      // For web series, check season data
      if (content.web_series?.seasons?.[0]?.writer) {
        writers = Array.isArray(content.web_series.seasons[0].writer) 
          ? content.web_series.seasons[0].writer 
          : [content.web_series.seasons[0].writer];
      } else if (content.originalData?.web_series?.seasons?.[0]?.writer) {
        writers = Array.isArray(content.originalData.web_series.seasons[0].writer) 
          ? content.originalData.web_series.seasons[0].writer 
          : [content.originalData.web_series.seasons[0].writer];
      }
    } else if (contentType === 'Show') {
      // For shows, check show data
      if (content.show?.writers) {
        writers = Array.isArray(content.show.writers) 
          ? content.show.writers 
          : [content.show.writers];
      } else if (content.originalData?.show?.writers) {
        writers = Array.isArray(content.originalData.show.writers) 
          ? content.originalData.show.writers 
          : [content.originalData.show.writers];
      }
    }

    // Fallback to generic writers field
    if (writers.length === 0 && content.writers) {
      writers = Array.isArray(content.writers) 
        ? content.writers 
        : [content.writers];
    }

    console.log('Writers found:', writers, 'Content type:', contentType);
    return writers.filter(w => w && w.trim() !== '');
  };

  // Helper function to get cast members
  const getCastMembers = () => {
    let cast = [];

    // Check content type and access appropriate data
    const contentType = getContentType();
    
    if (contentType === 'Movie') {
      // For movies, check movie data structure
      if (content.movie?.cast_members) {
        cast = Array.isArray(content.movie.cast_members) 
          ? content.movie.cast_members 
          : [content.movie.cast_members];
      } else if (content.originalData?.movie?.cast_members) {
        cast = Array.isArray(content.originalData.movie.cast_members) 
          ? content.originalData.movie.cast_members 
          : [content.originalData.movie.cast_members];
      }
    } else if (contentType === 'Web Series') {
      // For web series, check season data
      if (content.web_series?.seasons?.[0]?.cast_members) {
        cast = Array.isArray(content.web_series.seasons[0].cast_members) 
          ? content.web_series.seasons[0].cast_members 
          : [content.web_series.seasons[0].cast_members];
      } else if (content.originalData?.web_series?.seasons?.[0]?.cast_members) {
        cast = Array.isArray(content.originalData.web_series.seasons[0].cast_members) 
          ? content.originalData.web_series.seasons[0].cast_members 
          : [content.originalData.web_series.seasons[0].cast_members];
      }
    } else if (contentType === 'Show') {
      // For shows, check show data
      if (content.show?.cast_members) {
        cast = Array.isArray(content.show.cast_members) 
          ? content.show.cast_members 
          : [content.show.cast_members];
      } else if (content.originalData?.show?.cast_members) {
        cast = Array.isArray(content.originalData.show.cast_members) 
          ? content.originalData.show.cast_members 
          : [content.originalData.show.cast_members];
      }
    }

    // Fallback to generic cast_members field
    if (cast.length === 0 && content.cast_members) {
      cast = Array.isArray(content.cast_members) 
        ? content.cast_members 
        : [content.cast_members];
    }

    console.log('Cast members found:', cast, 'Content type:', contentType);
    return cast.filter(c => c && c.trim() !== '');
  };

  // Helper function to get genres
  const getGenres = () => {
    if (content.originalData?.genre) {
      return Array.isArray(content.originalData.genre) 
        ? content.originalData.genre 
        : [content.originalData.genre];
    } else if (content.genre) {
      return Array.isArray(content.genre) 
        ? content.genre 
        : [content.genre];
    }
    return [];
  };

  const directors = getDirectors();
  const writers = getWriters();
  const castMembers = getCastMembers();
  const genres = getGenres();
  const durationOrSeason = getDurationOrSeason();
  const episodeCount = getEpisodeCount();

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
              className="bg-primary/5 backdrop-blur-sm border border-primary/30 text-primary hover:bg-gradient-to-br hover:from-black/30 hover:via-dark-green/5 hover:to-black/30 hover:border-primary/20 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          <Card className="bg-gradient-to-br from-black/90 via-dark-green/20 to-black/90 backdrop-blur-sm border border-border/50 wave-transition relative overflow-hidden">
            {/* Animated Background Waves */}
            <div className="absolute inset-0">
              <div className="upcoming-wave-bg-1"></div>
              <div className="upcoming-wave-bg-2"></div>
              <div className="upcoming-wave-bg-3"></div>
            </div>

            <CardHeader className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="w-full aspect-[16/9] relative overflow-hidden rounded-lg">
                    <img 
                      src={getImageUrl()} 
                      alt={getTitle()} 
                      className="w-full h-full object-cover object-center" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== '/placeholder.svg') {
                          target.src = '/placeholder.svg';
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6 min-w-0">
                  <h1 className="text-xl font-bold text-foreground">
                    {getTitle()}
                  </h1>

                  <div className="flex items-center space-x-3 flex-wrap">
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded border border-primary/30 text-xs font-medium">
                      {getRating()}
                    </span>
                    <span className="bg-blue-900/25 text-blue-200 px-2 py-1 rounded border border-blue-800/40 text-xs font-medium">
                      {getContentType()}
                    </span>
                    <div className="flex items-center space-x-2 bg-emerald-800/20 px-2 py-1 rounded-md border border-emerald-700/30">
                      <Calendar className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-100 font-medium text-xs">
                        {getYear()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-foreground font-medium text-xs">{getScore()}</span>
                    </div>
                    {durationOrSeason && (
                      <div className="flex items-center space-x-2 bg-violet-800/20 px-2 py-1 rounded-md border border-violet-700/30">
                        <Clock className="w-3 h-3 text-violet-400" />
                        <span className="text-violet-100 font-medium text-xs highlight-glow">
                          {durationOrSeason}
                        </span>
                      </div>
                    )}
                    {episodeCount && getContentType() !== 'Movie' && (
                      <div className="flex items-center space-x-2 bg-amber-800/20 px-2 py-1 rounded-md border border-amber-700/30">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span className="text-amber-100 font-medium text-xs">
                          {episodeCount}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <p className="text-foreground/90 leading-relaxed text-sm font-normal whitespace-pre-line break-words">
                      {getDescription()}
                    </p>
                  </div>

                  <div className="flex justify-start gap-3 mt-6">
                    <Button 
                      onClick={handlePlayClick} 
                      className="bg-primary/10 backdrop-blur-sm border border-primary/50 text-primary hover:bg-gradient-to-br hover:from-black/60 hover:via-dark-green/10 hover:to-black/60 hover:border-primary/30 transition-all duration-300 px-3 py-1.5 text-xs"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Play
                    </Button>
                    <Button 
                      onClick={() => console.log('Play trailer for:', getTitle())} 
                      className="bg-primary/10 backdrop-blur-sm border border-primary/50 text-primary hover:bg-gradient-to-br hover:from-black/60 hover:via-dark-green/10 hover:to-black/60 hover:border-primary/30 transition-all duration-300 px-3 py-1.5 text-xs"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Trailer
                    </Button>
                  </div>

                  

                  {/* Additional Content Details */}
                  <div className="space-y-4 border-t border-border/30 pt-6">
                    <h2 className="text-xl font-semibold text-foreground mb-4">Additional Details</h2>

                    <div className="space-y-4">
                      {genres.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">Genres</h3>
                          <div className="flex flex-wrap gap-2">
                            {genres.map((genre, index) => (
                              <span 
                                key={index} 
                                className="bg-purple-800/20 text-purple-300 px-2 py-1 rounded border border-purple-700/30 text-xs"
                              >
                                {genre}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {directors.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">Directors</h3>
                          <div className="flex flex-wrap gap-2">
                            {directors.map((director, index) => (
                              <span 
                                key={index} 
                                className="bg-orange-800/20 text-orange-300 px-2 py-1 rounded border border-orange-700/30 text-xs"
                              >
                                {director.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {writers.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">Writers</h3>
                          <div className="flex flex-wrap gap-2">
                            {writers.map((writer, index) => (
                              <span 
                                key={index} 
                                className="bg-teal-800/20 text-teal-300 px-2 py-1 rounded border border-teal-700/30 text-xs"
                              >
                                {writer.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {castMembers.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">Cast Members</h3>
                          <div className="flex flex-wrap gap-2">
                            {castMembers.map((castMember, index) => (
                              <span 
                                key={index} 
                                className="bg-pink-800/20 text-pink-300 px-2 py-1 rounded border border-pink-700/30 text-xs"
                              >
                                {castMember.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
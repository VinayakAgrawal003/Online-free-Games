import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Box, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { gameAPI } from "@/services/api";
import GameCard from "@/components/game/gameCards";
import Loader from "@/components/ui/loader";
import Toast from "@/components/ui/toast";
import Button from "@/components/ui/button";
import Layout from "@/components/layout/layout";

const GENRES = ["action", "adventure", "puzzle", "rpg", "sports", "strategy", "other"];

export default function GamingPage() {
  const router = useRouter();
  const theme = useTheme();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    genre: "",
    keyword: "",
  });

  useEffect(() => {
    fetchGames();
  }, [page, filters]);

  const fetchGames = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit: 12,
      };
      
      if (filters.genre) {
        params.genre = filters.genre;
      }
      
      if (filters.keyword) {
        params.keyword = filters.keyword;
      }

      const response = await gameAPI.listAllGames(params);
      setGames(response.data || []);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      setError(err.message || "Failed to fetch games");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page when filters change
  };

  if (loading && games.length === 0) {
    return <Loader fullscreen />;
  }

  return (
    <>
      <Head>
        <title>Gaming - CyberArena</title>
        <meta name="description" content="Browse and play games on CyberArena" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout filters={filters} onFilterChange={handleFilterChange}>
        <Box sx={{ width: "100%", minHeight: "100vh" }}>
          <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: { xs: "24px", md: "48px" } }}>
            {/* Header */}
            <Box sx={{ marginBottom: "32px" }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  marginBottom: "8px",
                  background: "linear-gradient(135deg, #a855f7, #38bdf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                }}
              >
                Discover Games
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: theme.palette.text.secondary,
                  fontSize: "16px",
                }}
              >
                Explore our collection of amazing games
              </Typography>
            </Box>

            {/* Games Grid */}
            {loading ? (
              <Box sx={{ textAlign: "center", padding: "48px" }}>
                <Loader />
              </Box>
            ) : games.length === 0 ? (
              <Box sx={{ textAlign: "center", padding: "48px" }}>
                <Typography variant="h6" sx={{ marginBottom: "8px", color: theme.palette.text.primary }}>
                  No games found
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Try adjusting your filters or check back later
                </Typography>
              </Box>
            ) : (
              <>
                <Grid container spacing={3}>
                  {games.map((game) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={game._id}>
                      <GameCard
                        title={game.title}
                        genre={game.genre}
                        thumbnail={game.avatar?.url || "/placeholder-game.png"}
                        averageRating={game.averageRating || 0}
                        totalReviews={game.totalReviews || 0}
                        onPlay={() => {
                          router.push(`/game/${game._id}`);
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box sx={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "32px" }}>
                    <Button
                      label="Previous"
                      variant="secondary"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    />
                    <Typography sx={{ alignSelf: "center", padding: "0 16px", color: theme.palette.text.primary }}>
                      Page {page} of {totalPages}
                    </Typography>
                    <Button
                      label="Next"
                      variant="secondary"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                    />
                  </Box>
                )}
              </>
            )}

            {showToast && error && (
              <Toast
                message={error}
                type="error"
                onClose={() => setShowToast(false)}
              />
            )}
          </Box>
        </Box>
      </Layout>
    </>
  );
}


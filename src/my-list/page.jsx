import { Typography, Container } from '@mui/material'

export default function MyList() {
  return (
    <Container maxWidth="lg" sx={{ mt: 20, mb: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        My List
      </Typography>
      <Typography variant="body1">
        Here you can view your saved anime titles. (Content to be added)
      </Typography>
    </Container>
  )
}


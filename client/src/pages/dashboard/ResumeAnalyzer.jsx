import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Header from '../../components/dashbord/dash-common/Header';
import WorkIcon from '@mui/icons-material/Work';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import Chip from '@mui/material/Chip';

// Styled components
const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const UploadBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  border: '2px dashed #e0e0e0',
  borderRadius: '16px',
  cursor: 'pointer',
  marginBottom: theme.spacing(2),
  backgroundColor: '#ffffff',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: '#f8f9fa',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
}));

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  backgroundColor: '#ffffff',
  marginBottom: theme.spacing(3),
}));

function ResumeAnalyzer() {
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobDescription) {
      alert('Please provide both job description and resume');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult({
        "JD Match": "75%",
        "MissingKeywords": ["Docker", "Kubernetes", "AWS"],
        "Profile Summary": "Strong match for the position with good technical background, but lacking some cloud technologies."
      });
    } catch (error) {
      console.error('Error analyzing resume:', error);
      alert('Error analyzing resume. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F7F3]">
      <div className="w-full">
        <Header title="Resume Analyzer" />
      </div>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
          <StyledCard elevation={0}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" component="h1" 
                sx={{ 
                  fontWeight: 600, 
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                Smart ATS Analyzer
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
                Optimize your resume for Applicant Tracking Systems
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <StyledCard elevation={0} sx={{ bgcolor: '#f8f9fa' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WorkIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Job Description</Typography>
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  variant="outlined"
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#ffffff',
                      borderRadius: '12px',
                    }
                  }}
                />
              </StyledCard>

              <StyledCard elevation={0} sx={{ bgcolor: '#f8f9fa' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <UploadFileIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Resume Upload</Typography>
                  <Tooltip title="Maximum file size: 200MB, PDF only">
                    <IconButton size="small" sx={{ ml: 1 }}>
                      <HelpOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
                <UploadBox>
                  {!file ? (
                    <Box>
                      <CloudUploadIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                      <Typography variant="h6" sx={{ mb: 1 }}>Drag and drop your resume here</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Limit 200MB per file • PDF
                      </Typography>
                      <Button
                        component="label"
                        variant="contained"
                        sx={{ 
                          borderRadius: '25px',
                          px: 4,
                          py: 1.5,
                          textTransform: 'none',
                          fontSize: '1.1rem'
                        }}
                      >
                        Browse files
                        <VisuallyHiddenInput type="file" accept=".pdf" onChange={handleFileChange} />
                      </Button>
                    </Box>
                  ) : (
                    <Box>
                      <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                      <Typography variant="h6" sx={{ color: 'success.main' }}>{file.name}</Typography>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => setFile(null)}
                        sx={{ mt: 2, borderRadius: '20px' }}
                      >
                        Remove
                      </Button>
                    </Box>
                  )}
                </UploadBox>
              </StyledCard>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading || !file || !jobDescription}
                sx={{ 
                  mt: 2, 
                  py: 1.5, 
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  textTransform: 'none'
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Analyze Resume'}
              </Button>

              {result && (
                <StyledCard sx={{ mt: 4, bgcolor: '#f8f9fa' }}>
                  <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
                    Analysis Results
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ mr: 2 }}>JD Match:</Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: parseInt(result["JD Match"]) > 70 ? 'success.main' : 'warning.main',
                        fontWeight: 'bold'
                      }}
                    >
                      {result["JD Match"]}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>Missing Keywords:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {result["MissingKeywords"].map((keyword, index) => (
                        <Chip
                          key={index}
                          label={keyword}
                          icon={<WarningIcon />}
                          color="warning"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>Profile Summary:</Typography>
                    <Typography variant="body1" color="text.secondary">
                      {result["Profile Summary"]}
                    </Typography>
                  </Box>
                </StyledCard>
              )}
            </Box>
          </StyledCard>
        </Box>
      </Container>
    </div>
  );
}

export default ResumeAnalyzer;
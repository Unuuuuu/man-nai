import React, { FormEventHandler, useRef, useState } from "react";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grow from "@mui/material/Grow";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import html2canvas from "html2canvas";
import { ReactComponent as PartyPopperIcon } from "./assets/party-popper.svg";
import { Data } from "./types";
import { getDataFromBirthday } from "./utils";

const accordionSx: SxProps<Theme> = (theme) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
});

const App = () => {
  const [birthday, setBirthday] = useState<Dayjs | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const handleDatePickerChange = (newBirthday: Dayjs | null) => {
    setBirthday(newBirthday);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    try {
      const dataFromBirthday = getDataFromBirthday(birthday);
      setData(dataFromBirthday);
    } catch {
      // ???????????? ?????? birthday??? ????????? ???????????? ?????? DatePicker component?????? ???????????? ?????? ????????? ?????? ????????? ?????? ?????? ??? ????????????.
      return;
    }
  };

  const handleSaveButtonClick = () => {
    if (targetRef.current === null) {
      return;
    }

    html2canvas(targetRef.current).then((canvas) => {
      const anchorElement = document.createElement("a");
      anchorElement.setAttribute("download", "man-nai.png");
      anchorElement.setAttribute("href", canvas.toDataURL());
      anchorElement.click();
    });
  };

  const handleShareButtonClick = () => {
    if (targetRef.current === null) {
      return;
    }

    html2canvas(targetRef.current).then((canvas) => {
      canvas.toBlob(async (blob) => {
        if (blob === null || typeof navigator.share === "undefined") {
          return;
        }

        await navigator.share({
          title: "??? ?????? ?????????",
          url: "https://www.man-nai.com",
          files: [new File([blob], "man-nai.png", { type: blob.type })],
        });
      });
    });
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100%",
        paddingTop: "16px",
        paddingBottom: "16px",
        overflowY: "auto",
      }}
    >
      <Alert severity="info">2023??? 6??? 28????????? ??? ????????? ???????????????.</Alert>
      <Box
        sx={{
          marginTop: "32px",
          marginBottom: "32px",
        }}
      >
        <Typography variant="h4" component="h1" align="center">
          ??? ?????? ?????????
        </Typography>
        <Typography variant="body1" component="h2" align="center">
          ??? ?????? ???????????? ??????????????????.
        </Typography>
      </Box>
      <Stack spacing={2}>
        <Box>
          <Accordion disableGutters elevation={0} sx={accordionSx}>
            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
              <Typography variant="body2">??? ?????? ???????????? ??????</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                ?????? ???????????? ?????? ????????? ??? ??? ????????? ???????????? ????????? ????????????,
                ????????? ?????? ??? ???????????? ??? ?????? ????????????.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion disableGutters elevation={0} sx={accordionSx}>
            <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
              <Typography variant="body2">????????? ?????? ???????????? ??????</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">
                ?????? ???????????? ?????? ????????? ??? ??? ??? ?????? ???????????????.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={2}>
            <DatePicker
              label="????????????"
              value={birthday}
              onChange={handleDatePickerChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  helperText={params.error ? "????????? ?????????????????????." : ""}
                />
              )}
              disableFuture
              openTo="year"
              views={["year", "month", "day"]}
              maxDate={dayjs()}
            />
            <Button variant="contained" type="submit" disableElevation>
              ????????????
            </Button>
          </Stack>
        </form>
        {data !== null && (
          <Grow in={data !== null}>
            <Stack spacing={2}>
              <Card variant="outlined">
                <Box ref={targetRef}>
                  <CardContent
                    sx={{ backgroundColor: "#fffde7", textAlign: "center" }}
                  >
                    <SvgIcon
                      component={PartyPopperIcon}
                      sx={{ fontSize: "64px", marginBottom: 2 }}
                    />
                    <Typography
                      color="text.secondary"
                      variant="caption"
                      component="div"
                    >
                      {data.diff === 2
                        ? "????????? ????????? ????????? ?????????"
                        : "????????? ????????? ?????????"}
                    </Typography>
                    <Typography>
                      {data.diff === 2 ? "???" : "???"} ?????? ????????????.
                    </Typography>
                  </CardContent>
                  <Divider />
                  <Stack direction="row" alignItems="center">
                    <Box sx={{ flex: 1, p: 2 }}>
                      <Typography
                        color="text.secondary"
                        variant="caption"
                        component="div"
                        align="center"
                      >
                        ????????? ??????
                      </Typography>
                      <Typography align="center">{data.koreanAge}???</Typography>
                    </Box>
                    <ChevronRightRoundedIcon />
                    <Box sx={{ flex: 1, p: 2 }}>
                      <Typography
                        color="text.secondary"
                        variant="caption"
                        component="div"
                        align="center"
                      >
                        ??? ??????
                      </Typography>
                      <Typography align="center">
                        {data.americanAge}???
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Card>
              <Box>
                <SpeedDial
                  ariaLabel="SpeedDial"
                  direction="left"
                  icon={<SpeedDialIcon />}
                >
                  <SpeedDialAction
                    icon={<SaveIcon />}
                    tooltipTitle="????????? ??????"
                    onClick={handleSaveButtonClick}
                  />
                  {typeof navigator.share !== "undefined" && (
                    <SpeedDialAction
                      icon={<ShareIcon />}
                      tooltipTitle="????????? ??????"
                      onClick={handleShareButtonClick}
                    />
                  )}
                </SpeedDial>
              </Box>
            </Stack>
          </Grow>
        )}
      </Stack>
    </Container>
  );
};

export default App;

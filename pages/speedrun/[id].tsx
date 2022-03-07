import { Alert, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Dropzone from 'react-dropzone';
import { GetServerSideProps } from 'next';
import prisma from '../../lib/prisma';
import useUser from '../../lib/useUser';
import { Center } from '../../components/util/Center';
import RespHeader from '../../components/util/RespHeader';
import axios from 'axios';
import { SpeedrunUpload } from '../../components/play/SpeedrunUpload';
import { Box } from '@mui/system';
import TimePicker from '../../components/runs/TimePicker';
import { post } from '../../lib/superfetch';

type Props = {
  game: GameDetails;
};

const Speedrun = (props: Props) => {
  const [err, setErr] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [h, setH] = useState<string | number>(0);
  const [m, setM] = useState<string | number>(0);
  const [s, setS] = useState<string | number>(0);
  const [upload, setUpload] = useState<number | undefined>(undefined);
  const [uploaded, setUploaded] = useState<boolean>(false);

  const router = useRouter();

  const { user, loading, token } = useUser();

  if (!user && !loading) router.push('/signin');

  async function submit() {
    if (!file) return setErr('Please select a file');
    if (typeof h != 'number' || typeof m != 'number' || typeof s != 'number')
      return setErr('Please set a valid time');

    if (h * 3600 + m * 60 + s == 0)
      return setErr('Please set a time greater than 0 seconds');

    const data = new FormData();
    data.set('file', file);
    data.set('upload_preset', 'ni8osear');

    try {
      const cloudRes = await axios.post(
        'https://api.cloudinary.com/v1_1/oliveman/video/upload',
        data,
        {
          onUploadProgress: (event) => {
            setUpload(Math.round((event.loaded / event.total) * 100));
          },
        }
      );

      const jsonData = cloudRes.data;
      if (jsonData?.error) return setErr(jsonData?.error?.message);
      if (!jsonData)
        return setErr(
          "The server did not reply with anything. This shouldn't be possible."
        );

      await post(
        `/api/run/submit/${props.game.id}`,
        {
          time: h * 3600 + m * 60 + s,
          video: jsonData.secure_url,
        },
        {
          token,
        }
      );

      setUploaded(true);
    } catch (err: any) {
      if (err.message == 'Network Error') {
        return setErr(
          "File too large! (you're bad at speedrunning) (max file size: 100MB)"
        );
      }
    }
  }

  return (
    <Center>
      <Paper
        sx={{
          p: {
            xs: 2,
            sm: 10,
          },
          width: 'min(90vw, 900px)',
          m: {
            xs: 1,
            sm: 10,
          },
        }}
      >
        {err && <Alert severity="error">{err}</Alert>}
        <RespHeader>
          Submit speedrun on &quot;{props.game.name}&quot;
        </RespHeader>
        {!uploaded && (
          <>
            <Typography sx={{ mb: 0.5 }}>Video:</Typography>
            <Dropzone
              onDrop={(acceptedFiles) => {
                setFile(acceptedFiles[0]);
                setErr(undefined);
                setUpload(undefined);
              }}
              accept="video/*"
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Paper
                    elevation={2}
                    sx={{
                      height: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 2,
                    }}
                  >
                    {file && <Typography noWrap>{file.name}</Typography>}
                    {!file && (
                      <Typography>
                        Drag and drop or click to add video
                      </Typography>
                    )}
                  </Paper>
                </div>
              )}
            </Dropzone>

            <Typography sx={{ mb: 0.5, mt: 2 }}>Time:</Typography>
            <TimePicker
              h={h}
              m={m}
              s={s}
              onChange={(h, m, s) => {
                setH(h);
                setM(m);
                setS(s);
              }}
            />
          </>
        )}
        <Box sx={{ mt: 2 }}>
          <SpeedrunUpload upload={upload} submit={submit} uploaded={uploaded} />
        </Box>
      </Paper>
    </Center>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = parseInt(context.params?.id as string);
  if (!id) return { notFound: true };

  const game = await prisma.game.findUnique({
    where: {
      id,
    },
  });

  if (!game) return { notFound: true };

  return { props: { game } };
};

export default Speedrun;

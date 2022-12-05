import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import MyModal from "../../Utils/MyModal";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyInput from "../../Utils/InputFieldFormik";
import { useRef } from "react";
import { CreateCollection } from "../../../Redux";
import SideBarCollectionList from "./SideBarCollectionList";

function SideBarCollection() {
  const collection = useSelector((s) => s?.collection);

  return (
    <Box>
      <SideBarCollectionList collection={collection} />

      {collection.length <= 0 && <NoCollection />}
    </Box>
  );
}

const NoCollection = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component={"img"}
        src={"./assets/logo.webp"}
        sx={{
          width: "150px",
          height: "170px",
        }}
      />

      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: "grey",
            fontSize: "14px",
            paddingBottom: "8px",
          }}
        >
          You don’t have any collections
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: "500",
            color: "grey",
          }}
        >
          Collections let you group related requests, making them easier to
          access and run.
        </Typography>
      </Box>
      <Button
        sx={{
          fontSize: "14px",
          textTransform: "none",
        }}
        onClick={() => setOpen(true)}
      >
        Create Collection
      </Button>
      <CreateCollectonModal open={open} setOpen={setOpen} />
    </Box>
  );
};

export const CreateCollectonModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const input = useRef({});
  const initialValue = {
    name: "",
  };

  const submitHandler = async (h) => {
    await dispatch(CreateCollection(h));
    setOpen(false);
  };
  return (
    <MyModal open={open} setOpen={setOpen}>
      <Formik
        initialValues={initialValue}
        validationSchema={Yup.object().shape({
          name: Yup.string().required(),
        })}
        onSubmit={submitHandler}
      >
        {(formik) => {
          return (
            <>
              <Form>
                <Box
                  sx={{
                    width: 500,
                  }}
                >
                  <Box
                    sx={{
                      borderBottom: "1px solid grey",
                      padding: "8px 16px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "grey",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Create Collection
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      padding: "16px 8px",
                    }}
                  >
                    <MyInput
                      handler={formik}
                      ref={input}
                      {...{ name: "name" }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    padding: "8px 16px",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                  <Button type="submit">Save</Button>
                </Box>
              </Form>
            </>
          );
        }}
      </Formik>
    </MyModal>
  );
};

export default React.memo(SideBarCollection);

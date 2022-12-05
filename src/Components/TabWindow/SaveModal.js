import React, { useEffect, useRef } from "react";
import MyModal from "../Utils/MyModal";
import { Formik, Form } from "formik";
import { Button, Grid, Typography } from "@mui/material";
import InputField, { SelectType } from "../Utils/InputFieldFormik";
import { useSelector, useDispatch } from "react-redux";
import { AddRequestInCollection, ChangeRequest } from "../../Redux";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  collectionuuid: Yup.string().required(),
});
export default function SaveModal({ open, setOpen, uuid }) {
  const ref = useRef({});
  const dispatch = useDispatch();
  const collections = useSelector((c) => {
    return c.collection?.map((m) => {
      return { name: m?.name, uuid: m?.uuid };
    });
  });

  const handleSubmit = async (s) => {
    await dispatch(AddRequestInCollection({ ...s, requestuuid: uuid }));
    await dispatch(ChangeRequest({ ...s, uuid }));
    handleClose();
  };

  const handleClose = () => {
    setOpen?.((s) => !s);
  };

  const options = collections?.map((m) => {
    return { key: m?.name, value: m?.uuid };
  });
  const item = [
    {
      name: "name",
      //   placeholder: "Request Name",
      label: "Request Name*",
    },
    {
      name: "collectionuuid",
      label: "Collection *",
      options: options,
    },
  ];
  return (
    <MyModal open={open} setOpen={handleClose}>
      <Grid
        sx={{
          width: "400px",
        }}
      >
        <Formik
          initialValues={{
            name: "",
            collectionuuid: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <Grid
                  sx={{
                    padding: "12px 16px",
                    borderBottom: "1px solid rgba(0,0,0,0.09)",
                  }}
                >
                  <Typography>Save Request</Typography>
                </Grid>
                <Grid
                  sx={{
                    padding: "0px 16px",
                  }}
                >
                  <Grid
                    sx={{
                      padding: "10px 0px",
                    }}
                  >
                    <InputField handler={formik} ref={ref} {...item[0]} />
                  </Grid>
                  <Grid
                    sx={{
                      padding: "10px 0px",
                    }}
                  >
                    <SelectType handler={formik} ref={ref} {...item[1]} />
                  </Grid>
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    padding: "16px",
                  }}
                >
                  <Button
                    variant="contained"
                    color={"disable"}
                    onClick={handleClose}
                    sx={{
                      color: "#fff",
                      margin: "0px 16px",
                    }}
                  >
                    cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    Save
                  </Button>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid>
    </MyModal>
  );
}

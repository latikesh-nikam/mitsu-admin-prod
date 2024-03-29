import React, { useState } from 'react';
import toast from 'react-hot-toast';
import BasicModalDialog from '../../../../../component/modal';
import GroundingExercise from '../../../../../component/program-modules/grounding-exercise';
import ShowModalActivityAudio from '../showModalActivityAudio';
import ShowModalActivityVideo from '../showModalActivityVideo';
import ShowQuizQuesModal from '../showQuizQuesModal';
import { v4 as uuidv4 } from "uuid";
import _ from 'lodash';


interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  postOnboardingQuestions: any
  setGroundExercisingData: (e: any) => void
  quizArr: any
  setQuizArr: (e: any) => void
  audioArr: any
  setAudioArr: (e: any) => void
  videoArr: any
  setVideoArr: (e: any) => void
}

const ShowModalGroundingExercise: React.FC<Props> = ({ open, setOpen, postOnboardingQuestions, setGroundExercisingData, audioArr, setAudioArr, videoArr, setVideoArr, quizArr, setQuizArr }) => {
  const [heading, setHeading] = useState<any>("");
  const [questionText, setQuestionText] = useState<any>("");

  const [options, setOptions] = useState<any>([{
    id: uuidv4(), label: "Selection-1", name: "", desc: "", subScreens: {}
  }]);

  const [subScreenData, setSubScreenData] = useState<any>([]);
  const [visible, setVisible] = useState<boolean>(true);
  const [audioData, setAudioData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [quizOpen, setQuizOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const [dynamicError, setDynamicError] = useState<{ [key: string]: string }>({
    name0: "Field can not be empty!"
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGroundExercisingData({
      content_heading: heading,
      content_text: questionText,
      options: options
    })
    toast.success("Submitted Successfully!");
    setOpen(false);
    setSubScreenData([])
    setQuizData([])
    setAudioData([])
    setVideoData([])
    setOptions([{}])
    setHeading("")
    setQuestionText("")
  };

  const handleDynamicInputValidation = (event: React.ChangeEvent<HTMLInputElement>, index: number, key: string) => {

    let data = [...options];
    if (data[index][key].trim() === '') {
      setDynamicError({ ...dynamicError, [`${event.target.name}${index}`]: "Field can not be empty!" })
    } else { delete dynamicError[`${event.target.name}${index}`]; setDynamicError(dynamicError) }
  }
  // if (event.target.name === "name") {
  //   if (data[index].name.trim() === "") {
  //     setDynamicError({ ...dynamicError, [`${event.target.name}${index}`]: "Field can not be empty!" })
  //   } else { delete dynamicError[`${event.target.name}${index}`]; setDynamicError(dynamicError) }
  // }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let data = [...options];
    if ((!!event.target) && (event.target.name === "name")) {
      data[index].name = event.target.value;
      handleDynamicInputValidation(event, index, 'name')
    }
    else {
      data[index].desc = event
    }
    setOptions([...data])
  };


  const handleSubScreenSelect = (e: any, actionMeta: any, activityFieldCount: number, dayCount: number, index: number) => {
    let data = [...options]
    data[index].subScreens = e
    setOptions([...data]);
    // handleDynamicSelectValidation(e, index)

    if (e.label === 'Quiz') {
      setQuizOpen(true)
      return
    }
    if (e.label === 'Audio') {
      setAudioOpen(true)
      return
    }
    if (e.label === 'Video') {
      setVideoOpen(true)
      return
    }
  };

  return (
    <>
      <BasicModalDialog
        children={
          <GroundingExercise
            handleSubmit={handleSubmit}
            setQuestionText={setQuestionText}
            setHeading={setHeading}
            heading={heading}
            questionText={questionText}
            options={options}
            setOptions={setOptions}
            handleInputChange={handleInputChange}
            setOpen={setOpen}
            handleChangeSelect={handleSubScreenSelect}
            selectedOptions={subScreenData}
            handleDynamicValidation={handleDynamicInputValidation}
            dynamicError={dynamicError}
          />
        }
        open={open}
        setOpen={setOpen}
        title="Grounding Exercise"
      />

      <ShowQuizQuesModal open={quizOpen} setOpen={setQuizOpen} setQuizFormData={setQuizData} postOnboardingQuestions={postOnboardingQuestions} activity={'GroundingExercise'} quizArr={quizArr} setQuizArr={setQuizArr} />

      <ShowModalActivityAudio open={audioOpen} setOpen={setAudioOpen} setActivityAudioFormData={setAudioData} activity={'GroundingExercise'} audioArr={audioArr} setAudioArr={setAudioArr} />

      <ShowModalActivityVideo open={videoOpen} setOpen={setVideoOpen} setActivityVideoFormData={setVideoData} activity={'GroundingExercise'} videoArr={videoArr} setVideoArr={setVideoArr} />
    </>
  )
}

export default ShowModalGroundingExercise

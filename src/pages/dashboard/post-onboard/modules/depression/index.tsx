/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styles from "./depression.module.scss";
import ModuleList from '../../../../../component/modules-list';
import { getAllModules, getProgramsByCategories, assignModuleToCategories } from '../../../../../services/service/module.service';
import ModuleAddModal from '../../../../../sharedComponent/modules/moduleModal';
import { Button } from '@mui/joy';
import { Add } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import Canvas from '../../../../../component/canvas';
import Accordion from '../../../../../component/accordion';

const Depression: React.FC = () => {
  const [showModal, setModal] = useState(false)
  const [modules, setModules] = useState([]);
  const [moduleIds, setModuleIds] = useState([]);
  const [assignedModules, setAssignModules] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [showPreview, setPreview] = useState(false);

  const [subModulesData, setSubModulesData] = useState<any>([]);
  const [activitiesData, setActivitiesData] = useState<any>([]);
  const [screensData, setScreensData] = useState<any>([]);
  const [modulesData, setModulesData] = useState<any>({});

  const getModules = async () => {
    const res = await getProgramsByCategories(`Depression`)
    setCategoryId(res?.data?.data[0].id)
    setModules(res?.data?.data.map((item: any, index: number) => {
      return item.modules
    }))
  }

  const getAllCategoryModules = async () => {
    const response = await getAllModules()
    setAssignModules(response?.data?.data)
  }

  useEffect(() => {
    getModules()
  }, [])

  useEffect(() => {
    getAllCategoryModules()
  }, [])

  const handleAddOption = (e: any) => {
    e.stopPropagation()
    setModal(true)
  };


  const assignModules = async () => {
    let assignModuleIds = moduleIds?.map((item) => {
      return { id: item }
    })
    let moduleDetails = {
      id: categoryId,
      category: 'Depression',
      modules: [
        ...assignModuleIds, ...modules[0]
      ]
    }
    const res = await assignModuleToCategories(moduleDetails)
    if (res) {
      setModal(false)
      setModuleIds([])
      toast.success("Module assigned Successfully!!")
      getModules()
    } else {
      toast.error("Something went wrong !!")
    }
  };

  const sendPreviewData = (item: any) => {
    const modulesdata = { ...item }
    setModulesData(modulesdata);
    setSubModulesData(item.sub_modules);
    const activitesdata = item?.sub_modules?.map((val: any) => val?.activities)
    setActivitiesData(activitesdata)
    const screensArray: any = []
    const screendata = activitesdata.forEach((array: any) => screensArray.push(array.map((val: any) => val.screens)))
    setScreensData(screensArray.flat());
  }

  return (
    <div className={styles.container}>
      <div className={styles.btn}>
        <Button
          variant="soft"
          color="primary"
          startDecorator={<Add />}
          onClick={(e) => handleAddOption(e)}
          type="button"
          className={styles.addBtn}
        >
          Add Modules to Depression
        </Button>
      </div>
      {showModal && (
        <ModuleAddModal
          showModal={showModal}
          setModal={setModal}
          modules={assignedModules}
          moduleIds={moduleIds}
          setModuleIds={setModuleIds}
          title={'Depression'}
          assignModules={assignModules}
          disabled={moduleIds.length > 0 ? false : true}
        />
      )}
      {showPreview && (
        <Canvas
          setVisible={setPreview}
          visible={showPreview}
          children={
            <Accordion
              subModulesData={subModulesData}
              activitiesData={activitiesData}
              screensData={screensData}
              modulesData={modulesData}
            />
          }
        />
      )}
      <ModuleList modulesList={modules ? modules[0] : []} setPreview={setPreview} previewData={(item) => sendPreviewData(item)} />
    </div>
  )
};

export default Depression
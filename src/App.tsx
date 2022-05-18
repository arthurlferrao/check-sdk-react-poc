import React from 'react'
import {
  UnicoCheckBuilder,
  SelfieCameraTypes,
  SelfieCameraType,
  UnicoThemeBuilder,
  DocumentCameraTypes,
  DocumentCameraType,
  ErrorPictureResponse,
  SuccessPictureResponse,
  CallbackCamera,
  SupportPictureResponse
} from 'unico-webframe'

const RESOURCES_DIRECTORY = "/resources"
const MODELS_PATH = "https://localhost:3000/models"

function App() {
  const unicoTheme = new UnicoThemeBuilder()
    .setColorSilhouetteSuccess("#0384fc")
    .setColorSilhouetteError("#D50000")
    .setColorSilhouetteNeutral("#fcfcfc")
    .setBackgroundColor("#dff1f5")
    .setColorText("#0384fc")
    .setBackgroundColorComponents("#0384fc")
    .setColorTextComponents("#dff1f5")
    .setBackgroundColorButtons("#0384fc")
    .setColorTextButtons("#dff1f5")
    .setBackgroundColorBoxMessage("#fff")
    .setColorTextBoxMessage("#000")
    .setHtmlPopupLoading(`<div style="position: absolute; top: 45%; right: 50%; transform:
      translate(50%, -50%); z-index: 10; text-align: center;">Carregando...</div>`)
    .build()

  const unicoCamera = new UnicoCheckBuilder()
    .setResourceDirectory(RESOURCES_DIRECTORY)
    .setModelsPath(MODELS_PATH)
    .setTheme(unicoTheme)
    .build()
  
  const callback: CallbackCamera = {
    on: {
      success: function(obj: SuccessPictureResponse) {
        console.log("SuccessPictureResponse", obj.base64);
      },
      error: function(error: ErrorPictureResponse) {
        console.error("ErrorPictureResponse", error)
        //confira na aba "Configurações" sobre os tipos de erros
      },
      support: function(error: SupportPictureResponse) {
        console.error("SupportPictureResponse", error)
      }
    }
  }

  const startSelfCamera = async (jsonPath: string, selfieType: SelfieCameraType) => {
    const { open } = await unicoCamera.prepareSelfieCamera(jsonPath, selfieType)
    open(callback)
  }

  const startDocumentCamera = async (jsonPath: string, documentType: DocumentCameraType) => {
    const { open } = await unicoCamera.prepareDocumentCamera(jsonPath, documentType)
    open(callback)
  }


  return (
    <div className="App">
      <button onClick={() => startSelfCamera("/services.json", SelfieCameraTypes.NORMAL)}>
        Start Normal Camera
      </button>
      <button onClick={() => startSelfCamera("/services.json", SelfieCameraTypes.SMART)}>
        Start Smart Camera
      </button>
      <button onClick={() => startDocumentCamera("/services.json", DocumentCameraTypes.CNH)}>
        Start CNH Camera
      </button>
      <button onClick={() => startDocumentCamera("/services.json", DocumentCameraTypes.OTHERS("Other"))}>
        Start Generic Document Camera
      </button>
      <div id="box-camera"></div>
    </div>
  );
}

export default App;

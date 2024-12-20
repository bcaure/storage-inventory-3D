import { CustomFlowbiteTheme, Flowbite, Modal } from "flowbite-react";
import { AssetDataType } from "../shared/types";

const customTheme: CustomFlowbiteTheme = {
    modal: {
      root: {
        show: {
            on: "flex bg-transparent",
        },
      },
      content: {
        inner: "relative flex max-h-[90dvh] flex-col rounded-lg bg-gray-700 shadow dark:bg-gray-700"
      },
      header: {
        base: "flex items-center justify-between p-5 rounded-t border-b dark:border-gray-700",
        title: "text-xl font-medium text-white dark:text-white",
      },
    }
};

export const AssetPanel = ({ asset, openModal, setOpenModal }: { asset: AssetDataType | undefined; openModal: boolean; setOpenModal: (b: boolean) => void }) => {
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Modal dismissible show={openModal} position="top-left" size="xl" onClose={() => setOpenModal(false)}>
        <Modal.Header>Location {asset?.name}</Modal.Header>
        <Modal.Body>
          <div className="p-6 bg-gray-900 text-gray-100 rounded-lg shadow-md">
            <div className="grid grid-cols-1 gap-4">

              {/* State */}
              <div className="flex flex-col gap-y-2">
                <label className="block text-sm font-medium text-gray-400">Status</label>
                {(() => {
                  switch (asset?.state) {
                    case "correct":
                      return <p className={`p-2 rounded bg-green-600 text-white`}>OK</p>;
                    case "missing-fyt":
                      return <p className={`p-2 rounded bg-red-600 text-white`}>Empty in FYT</p>;
                    case "missing-ts":
                      return <p className={`p-2 rounded bg-red-600 text-white`}>Not empty in FYT</p>;
                    case "product":
                      return <p className={`p-2 rounded bg-yellow-600 text-white`}>Product mismatch</p>;
                    default:
                      return null
                  }
                })()}
              </div>

              {/* Product Code Tracsphere */}
              <div className="flex flex-col gap-y-2">
                <label className="block text-sm font-medium text-gray-400">Product Code</label>
                <p className="bg-gray-800 p-2 rounded">{ asset?.assetCodeFyt !== asset?.assetCodeTracksphere ? 'Tracksphere: ' : '' }{asset?.productCodeTracsphere ?? "None"}</p>
                { asset?.productCodeFyt !== asset?.productCodeTracsphere && <p className="bg-gray-800 p-2 rounded">FYT: {asset?.productCodeFyt ?? "None"}</p> }
              </div>

              {/* Asset Code Tracksphere */}
              <div className="flex flex-col gap-y-2">
                <label className="block text-sm font-medium text-gray-400">Asset Code</label>
                <p className="bg-gray-800 p-2 rounded">{ asset?.assetCodeFyt !== asset?.assetCodeTracksphere ? 'Tracksphere: ' : '' }{asset?.assetCodeTracksphere ?? "None"}</p>
                { asset?.assetCodeFyt !== asset?.assetCodeTracksphere && <p className="bg-gray-800 p-2 rounded">FYT: {asset?.assetCodeFyt ?? "None"}</p> }
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Flowbite>
  );
};

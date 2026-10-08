import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FCF1D0] text-brown pb-24">

      {/* Header */}
      <header className="px-5 pt-8 max-w-md mx-auto">

        <div className="flex items-center justify-between">

          <h1 className="font-serif text-3xl font-bold">
            Profile
          </h1>

          <button
            onClick={() => navigate("/settings")}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
          >
            ⚙
          </button>

        </div>

      </header>


      {/* Profile */}
      <section className="max-w-md mx-auto px-5 mt-6">

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center gap-4">

            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-[#C4DAE8] flex items-center justify-center text-2xl font-serif font-bold">
              O
            </div>


            <div>

              <h2 className="font-serif text-xl font-bold">
                Oyinlola
              </h2>

              <p className="text-sm text-brown/50">
                @oyinlola
              </p>

              <p className="text-xs text-brown/50 mt-1">
                📍 Abuja
              </p>

            </div>

          </div>


          {/* Stats */}
          <div className="grid grid-cols-3 border-t border-brown/10 mt-5 pt-5">

            <div className="text-center">

              <p className="font-bold text-lg">
                12
              </p>

              <p className="text-xs text-brown/50">
                Saved
              </p>

            </div>


            <div className="text-center border-l border-r border-brown/10">

              <p className="font-bold text-lg">
                4
              </p>

              <p className="text-xs text-brown/50">
                Reviews
              </p>

            </div>


            <div className="text-center">

              <p className="font-bold text-lg">
                7
              </p>

              <p className="text-xs text-brown/50">
                Check-ins
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* My Activity */}
      <section className="max-w-md mx-auto px-5 mt-6">

        <h2 className="font-serif text-xl font-bold mb-3">
          My activity
        </h2>


        <div className="space-y-3">

          <button
            onClick={() => navigate("/saved")}
            className="w-full bg-white rounded-2xl p-4 flex items-center justify-between text-left shadow-sm"
          >

            <div className="flex items-center gap-3">

              <span className="w-10 h-10 rounded-xl bg-[#FFF0B5] flex items-center justify-center">
                ♡
              </span>

              <div>

                <h3 className="font-semibold text-sm">
                  Saved places
                </h3>

                <p className="text-xs text-brown/50 mt-1">
                  Places you want to visit
                </p>

              </div>

            </div>

            <span className="text-brown/40">
              →
            </span>

          </button>


          <button
            className="w-full bg-white rounded-2xl p-4 flex items-center justify-between text-left shadow-sm"
          >

            <div className="flex items-center gap-3">

              <span className="w-10 h-10 rounded-xl bg-[#C4DAE8] flex items-center justify-center">
                ★
              </span>

              <div>

                <h3 className="font-semibold text-sm">
                  My reviews
                </h3>

                <p className="text-xs text-brown/50 mt-1">
                  Places you've reviewed
                </p>

              </div>

            </div>

            <span className="text-brown/40">
              →
            </span>

          </button>


          <button
            className="w-full bg-white rounded-2xl p-4 flex items-center justify-between text-left shadow-sm"
          >

            <div className="flex items-center gap-3">

              <span className="w-10 h-10 rounded-xl bg-[#FFF0B5] flex items-center justify-center">
                📍
              </span>

              <div>

                <h3 className="font-semibold text-sm">
                  Check-ins
                </h3>

                <p className="text-xs text-brown/50 mt-1">
                  Places you've visited
                </p>

              </div>

            </div>

            <span className="text-brown/40">
              →
            </span>

          </button>

        </div>

      </section>


      {/* Profile Settings */}
      <section className="max-w-md mx-auto px-5 mt-6">

        <h2 className="font-serif text-xl font-bold mb-3">
          More
        </h2>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">

          <button
            onClick={() => navigate("/notifications")}
            className="w-full px-4 py-4 flex items-center justify-between border-b border-brown/10"
          >

            <span className="text-sm">
              Notifications
            </span>

            <span className="text-brown/40">
              →
            </span>

          </button>


          <button
            onClick={() => navigate("/settings")}
            className="w-full px-4 py-4 flex items-center justify-between border-b border-brown/10"
          >

            <span className="text-sm">
              Settings
            </span>

            <span className="text-brown/40">
              →
            </span>

          </button>


          <button
            onClick={() => navigate("/suggest")}
            className="w-full px-4 py-4 flex items-center justify-between"
          >

            <span className="text-sm">
              Suggest a place
            </span>

            <span className="text-brown/40">
              →
            </span>

          </button>

        </div>

      </section>


      {/* Footer */}
      <div className="max-w-md mx-auto px-5 mt-8 text-center">

        <p className="text-xs text-brown/35">
          Wayve · Abuja
        </p>

      </div>


      <BottomNav />

    </div>
  );
}

export default Profile;
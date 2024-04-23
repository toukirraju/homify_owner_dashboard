import React, { useState } from "react";

function withPullToRefresh(WrappedComponent) {
  return function WithPullToRefresh(props) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [startY, setStartY] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(null);

    function onRefresh() {
      setIsRefreshing(true);

      // Reload the entire page
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }

    function onTouchStart(event) {
      if (event.touches.length === 1) {
        // Record the starting Y coordinate and reset the elapsed time
        setStartY(event.touches[0].clientY);
        setTimeElapsed(0);
      }
    }

    function onTouchMove(event) {
      if (event.touches.length === 1 && startY !== null) {
        const now = new Date();
        const elapsed = now - timeElapsed;
        const deltaY = event.touches[0].clientY - startY;

        if (elapsed >= 3000 && deltaY > 0 && !isRefreshing) {
          onRefresh();
        }

        setTimeElapsed(now);
        setStartY(event.touches[0].clientY);
      }
    }

    return (
      <div
        style={{ height: "100vh", overflowY: "scroll" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        {isRefreshing ? "Refreshing..." : <WrappedComponent {...props} />}
      </div>
    );
  };
}

export default withPullToRefresh;

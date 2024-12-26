import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const IconButton = ({ icon: Icon, onClick, className }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-md transition-colors ${className}`}
  >
    <Icon className="w-5 h-5" />
  </button>
);

const CodeChangeLog = ({ logs, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white w-96 p-4 rounded-md">
        <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
          <h2 className="text-lg font-semibold">Change Logs</h2>
          <IconButton
            icon={X}
            onClick={onClose}
            className="text-gray-300 hover:text-white"
          />
        </div>
        
        <div className="h-64 overflow-y-auto">
    {logs && logs.length > 0 ? (
        logs.map((log, index) =>
            log ? (
                <div
                    key={index}
                    className="p-2 mb-2 border border-gray-700 rounded-md"
                >
                    <p className="text-sm font-mono">{log.code || "No code available"}</p>
                    <p className="text-xs text-gray-400">
                        Updated by: {log.username || "Unknown"} at{" "}
                        {log.timestamp
                            ? new Date(log.timestamp).toLocaleTimeString()
                            : "Unknown time"}
                    </p>
                </div>
            ) : null
        )
    ) : (
        <p className="text-sm text-gray-400">No changes logged yet.</p>
    )}
</div>

      </div>
    </div>
  );
};

export default CodeChangeLog;
